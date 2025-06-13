import { Request, Response } from 'express';
import { executeSP, executeSQL } from '../services/dbService'
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/authUtils';
import { UserLoginDTO, UserMailConfirmDTO, UserRegisterDTO } from '../models';
import { hashPassword } from '../utils/passwordUtils';
import { logInfo, logError, logWarn } from '../services/logService';

export const login = async (req: Request, res: Response) => {
    try {
        const user = new UserLoginDTO(req.body);
        if (!user.Email || !user.Password) {
            logWarn("Giriş denemesi başarısız - Eksik bilgiler", { source: "authController", action: "login", requestData: { email: user.Email }, additionalInfo: { reason: "Eksik kimlik bilgileri", timestamp: new Date(), ipAddress: req.ip } });
            res.status(400).json({ statu: false, title: 'Hata', message: 'Kullanıcı adı veya şifre hatalı.' });
            return;
        }

        user.Email = user.Email.trim();
        user.Password = user.Password.trim();

        const result = await executeSP('dbo.SP_Select_Login', false, user);

        if (!result) {
            logWarn("Giriş başarısız - Geçersiz kimlik bilgileri", { source: "authController", action: "login", requestData: { email: user.Email }, additionalInfo: { reason: "Geçersiz kimlik bilgileri", timestamp: new Date(), ipAddress: req.ip } });
            res.status(404).json({ statu: false, title: 'Hata', message: 'Kullanıcı adı veya şifre hatalı.' });
            return;
        }
        const accessToken = generateAccessToken(result);
        const refreshToken = generateRefreshToken(result);
        
        logInfo("Kullanıcı başarıyla giriş yaptı", { source: "authController", action: "login", requestData: user, responseData: result, userId: result?.UserID, additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });

        res.status(200).json({ 
            user: result, 
            accessToken: accessToken,
            refreshToken: refreshToken,
            statu: true, 
            title: 'Başarılı', 
            message: 'Giriş işlemi başarılı bir şekilde gerçekleştirildi.' 
        });
    } catch (error) {
        logError("Giriş işlemi hatası", { source: "authController", action: "login", requestData: { email: req.body.Email }, errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata', additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            res.status(400).json({ statu: false, title: 'Hata', message: 'Refresh token gerekli.' });
            return;
        }

        const decoded = verifyToken(refreshToken);
        if (!decoded || !decoded.UserID) {
            res.status(401).json({ statu: false, title: 'Hata', message: 'Geçersiz refresh token.' });
            return;
        }

        const result = await executeSP('dbo.SP_Select_User_By_ID', false, { UserID: decoded.UserID });
        if (!result) {
            res.status(404).json({ statu: false, title: 'Hata', message: 'Kullanıcı bulunamadı.' });
            return;
        }

        const newAccessToken = generateAccessToken(result);
        const newRefreshToken = generateRefreshToken(result);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            statu: true,
            title: 'Başarılı',
            message: 'Token yenileme işlemi başarılı.'
        });
    } catch (error) {
        logError("Token yenileme hatası", { source: "authController", action: "refreshToken", errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata', additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });
        res.status(500).json({ statu: false, title: 'Hata', message: 'Token yenileme işlemi başarısız.' });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const user = new UserRegisterDTO(req.body);
        if (!user.NameSurname || !user.Email || !user.Password) {
            logWarn("Kayıt başarısız - Eksik kullanıcı bilgileri", { source: "authController", action: "register", requestData: { email: user.Email }, additionalInfo: { reason: "Eksik kullanıcı bilgileri", timestamp: new Date(), ipAddress: req.ip } });
            res.status(400).json({ statu: false, title: 'Hata', message: 'Kullanıcı bilgileri eksik.' });
            return;
        }

        user.NameSurname = user.NameSurname.trim();
        user.Email = user.Email.trim();
        user.Password = user.Password.trim();
        // user.Password = await hashPassword(user.Password);

        const result = await executeSP('dbo.SP_Save_Register', false, user);
        if (!result) {
            logWarn("Kayıt başarısız - Veritabanı işlemi başarısız", { source: "authController", action: "register", requestData: { email: user.Email }, additionalInfo: { reason: "Veritabanı işlemi başarısız", timestamp: new Date(), ipAddress: req.ip } });
            res.status(400).json({ statu: false, title: 'Hata', message: 'Kullanıcı kayıt işlemi başarısız.' });
            return;
        }

        logInfo("Yeni kullanıcı başarıyla kaydedildi", { source: "authController", action: "register", requestData: { email: user.Email, name: user.NameSurname }, responseData: { success: true }, additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });
        res.status(201).json({ statu: true, title: 'Başarılı', message: 'Kayıt işlemi başarılı bir şekilde gerçekleştirildi.' });

    } catch (error) {
        logError("Kayıt işlemi hatası", { source: "authController", action: "register", requestData: { email: req.body.Email }, errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata', additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
};

export const mailConfirm = async (req: Request, res: Response) => {
    try {
        const user = new UserMailConfirmDTO(req.body);
        logInfo("Mail doğrulama denemesi", { source: "authController", action: "mailConfirm", requestData: { email: user.Email }, additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });

        const code = await executeSQL(`SELECT MailConfirmCode FROM Users WHERE Email = '${user.Email}'`);
        if (code[0].MailConfirmCode !== user.MailConfirmCode) {
            logWarn("Mail doğrulama başarısız - Geçersiz kod", { source: "authController", action: "mailConfirm", requestData: { email: user.Email }, additionalInfo: { reason: "Geçersiz doğrulama kodu", timestamp: new Date(), ipAddress: req.ip } });
            res.status(400).json({ statu: false, title: 'Hata', message: 'Mail doğrulama kodu hatalı.' });
            return;
        }

        logInfo("Mail başarıyla doğrulandı", { source: "authController", action: "mailConfirm", requestData: { email: user.Email }, responseData: { success: true }, additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });
        res.status(201).json({ statu: true, title: 'Başarılı', message: 'Mail doğrulama işlemi başarılı bir şekilde gerçekleştirildi.' });
    } catch (error) {
        logError("Mail doğrulama hatası", { source: "authController", action: "mailConfirm", requestData: { email: req.body.Email }, errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata', additionalInfo: { timestamp: new Date(), ipAddress: req.ip } });
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
};





