import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig';

export const generateAccessToken = (user: any): string => {
    return jwt.sign(user, envConfig.JWT_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (user: any): string => {
    return jwt.sign(user, envConfig.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, envConfig.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};
