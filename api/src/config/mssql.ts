import { config } from 'mssql';
import envConfig from './envConfig';
const dbConfig: config = {
    user: envConfig.DATABASE.USER,
    password: envConfig.DATABASE.PASSWORD,
    server: envConfig.DATABASE.HOST,
    // server: '20.52.107.245',
    port: envConfig.DATABASE.PORT,
    database: envConfig.DATABASE.NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};

export default dbConfig;