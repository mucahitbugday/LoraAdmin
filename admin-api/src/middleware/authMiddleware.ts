import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import envConfig from '../config/envConfig';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const rawToken = req.headers['authorization']?.split(' ')[1];
    const token = rawToken?.replace(/^"|"$/g, ''); // çift tırnakları temizle

    if (!token) {
        res.status(401).json({ message: 'Access token gerekli' });
        return;
    }

    const jwtSecret = envConfig.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if (decoded && typeof decoded === 'object' && 'UserID' in decoded) {
            req.body.SessionUserID = decoded.UserID;
            next();
        } else {
            res.status(401).json({ message: 'Geçersiz access token' });
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ 
                message: 'Token süresi doldu',
                code: 'TOKEN_EXPIRED'
            });
        } else {
            console.error('TOKEN DOĞRULAMA HATASI:', error);
            res.status(403).json({ message: 'Token doğrulama başarısız' });
        }
    }
};
