import { executeSP } from "./dbService";
import winston from 'winston';
import path from 'path';

// Winston logger yapılandırması
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'crm-api' },
    transports: [
        // Konsol transport'u
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, ...metadata }) => {
                    let msg = `${timestamp} [${level}]: ${message}`;
                    if (Object.keys(metadata).length > 0) {
                        msg += ` ${JSON.stringify(metadata)}`;
                    }
                    return msg;
                })
            )
        }),
        // Dosya transport'u
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        })
    ]
});

// Log seviyelerini tanımlama
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// Log yapısı için interface
interface LogData {
    source: string;
    action: string;
    requestData?: any;
    responseData?: any;
    errorMessage?: string;
    userId?: string;
    additionalInfo?: Record<string, any>;
}

// Gelişmiş loglama fonksiyonu
export const log = async (
    level: LogLevel,
    message: string,
    logData: LogData
) => {
    try {
        // Winston ile loglama
        logger[level]({
            message,
            ...logData,
            timestamp: new Date().toISOString()
        });

        // Veritabanına kaydetme
        try {
            const dbLogData = {
                LogType: level.toUpperCase(),
                Source: logData.source,
                Action: logData.action,
                RequestData: logData.requestData ? JSON.stringify(logData.requestData) : null,
                ResponseData: logData.responseData ? JSON.stringify(logData.responseData) : null,
                ErrorMessage: logData.errorMessage || null,
                UserId: '',
                AdditionalInfo: logData.additionalInfo ? JSON.stringify(logData.additionalInfo) : null
            };
            console.log(dbLogData);

            // await executeSP("dbo.SP_Save_Log", false, dbLogData);
        } catch (dbError) {
            // Veritabanı hatası durumunda sadece dosyaya log
            logger.error('Veritabanı loglama hatası:', { error: dbError, originalLog: { level, message, ...logData } });
        }
    } catch (error) {
        // Genel loglama hatası durumunda sadece dosyaya log
        logger.error('Genel loglama hatası:', { error });
    }
};

// Kolaylık sağlayan yardımcı fonksiyonlar
export const logError = (message: string, logData: LogData) => log('error', message, logData);
export const logWarn = (message: string, logData: LogData) => log('warn', message, logData);
export const logInfo = (message: string, logData: LogData) => log('info', message, logData);
export const logDebug = (message: string, logData: LogData) => log('debug', message, logData);