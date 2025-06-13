import express from 'express';
import {
    getMenu,
    getUser,
    readNotification,
    getNotifications,
    clearUserCache,
    clearDatabaseCache,
    clearAllCache
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getUser);
router.get('/menu', authMiddleware, getMenu);
router.get('/notifications', authMiddleware, getNotifications);
router.post('/notification/read', authMiddleware, readNotification);

// Cache temizleme rotaları
router.post('/cache/clear/user/:userId', authMiddleware, clearUserCache);
router.get('/cache/clear/database', authMiddleware, clearDatabaseCache);
router.get('/cache/clear/all', authMiddleware, clearAllCache);

export default router;