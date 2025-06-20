import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import routes from './src/routes'
import dotenv from 'dotenv';
import { ConnectionPool } from 'mssql';
import dbConfig from './src/config/mssql';
import Redis from 'ioredis';
import rabbitmqService from './src/services/rabbitmqService';
import envConfig from './src/config/envConfig';

dotenv.config();

const app = express();
app.use(helmet());
app.use(compression());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000000000 }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// CORS ayarları
app.options('*', cors());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://100.121.216.30:3000'
    ],
    credentials: true
}));

// Test database connection
async function testDatabaseConnection() {
    let pool: ConnectionPool | undefined;
    try {
        pool = await new ConnectionPool(dbConfig).connect();
        console.log('✅ SQL Server bağlantısı başarılı');
        return true;
    } catch (error) {
        console.error('❌ SQL Server bağlantı hatası:', error);
        return false;
    } finally {
        if (pool) await pool.close();
    }
}

// Test Redis connection
async function testRedisConnection() {
    const redis = new Redis({
        host: envConfig.REDIS.HOST,
        port: envConfig.REDIS.PORT,
        password: envConfig.REDIS.PASSWORD || undefined,
    });

    try {
        await redis.ping();
        console.log('✅ Redis bağlantısı başarılı');
        return true;
    } catch (error) {
        console.error('❌ Redis bağlantı hatası:', error);
        return false;
    } finally {
        redis.disconnect();
    }
}

// Routes
app.use('/api/auth', routes.authRoutes);
app.use('/api/user', routes.userRoutes);
app.use('/api/helper', routes.helperRoute);
app.get('/', async (req, res) => {
    try {
        const { executeSQL } = await import('./src/services/dbService');
        const users = await executeSQL(`SELECT * FROM dbo.Users`);
        res.json(users);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Veritabanı hatası oluştu' });
    }
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Bir şeyler ters gitti!' });
});

const PORT = envConfig.PORT || 3001;

// Start server after testing connections
async function startServer() {
    const dbConnected = await testDatabaseConnection();
    const redisConnected = await testRedisConnection();

    let rabbitmqConnected = false;
    try {
        await rabbitmqService.connect();
        rabbitmqConnected = true;
    } catch (error) {
        console.error('❌ RabbitMQ bağlantı hatası: 3');
    }

    if (!dbConnected || !redisConnected) {
        console.error('❌ Kritik bağlantı hatası. Sunucu başlatılamıyor.');
        process.exit(1);
    }

    if (!rabbitmqConnected) {
        console.warn('⚠️ RabbitMQ bağlantısı başarısız oldu, ancak sunucu başlatılıyor...');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
    });
}

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('⚠️ SIGTERM sinyali alındı. Sunucu kapatılıyor...');
    await rabbitmqService.closeConnection();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('⚠️ SIGINT sinyali alındı. Sunucu kapatılıyor...');
    await rabbitmqService.closeConnection();
    process.exit(0);
});

startServer();
