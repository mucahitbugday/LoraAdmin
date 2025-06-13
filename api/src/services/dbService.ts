import { ConnectionPool } from 'mssql';
import dbConfig from '../config/mssql';
// import { logError } from '../services/logService';


export const executeSP = async (procedureName: string, isList: boolean, params: any): Promise<any> => {
    let pool: ConnectionPool | undefined;

    try {
        pool = await new ConnectionPool(dbConfig).connect();
        const request = await pool.request();

        // Saklı prosedür için parametreleri belirtin
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                request.input(key, params[key]);
            }
        }

        // Saklı prosedürü çağırın
        const result = await request.execute(procedureName);

        // Birden fazla tablo varsa hepsini döndür
        if (Array.isArray(result.recordsets) && result.recordsets.length > 1) {
            return result.recordsets;
        }

        // Tek tablo varsa eski davranışı koru
        if (isList) {
            return result.recordset;
        }
        return result.recordset[0];
    } catch (error: any) {
        console.error('\n🚨 [SP HATASI] ---------------------------------');
        console.error(`🔧 Prosedür Adı: ${procedureName}`);
        console.error('🧾 Gönderilen Parametreler:', JSON.stringify(params, null, 2));
        console.error('💥 Hata Mesajı:', error.message || 'Bilinmeyen hata');
        console.error('📄 Stack Trace:', error.stack || 'Yok');
        console.error('---------------------------------------------\n');
        // logError('Stored Procedure Error', { source: 'dbService', action: 'executeSP', requestData: { procedure: procedureName, parameters: params }, errorMessage: error.message || 'Bilinmeyen hata', additionalInfo: { stack: error.stack || 'Yok' } });

        throw error;
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError: any) {
                console.error('\n⚠️ [Bağlantı Kapatma Hatası]');
                console.error('💥 Hata Mesajı:', closeError.message || 'Bilinmeyen hata');
                console.error('📄 Stack Trace:', closeError.stack || 'Yok');
                console.error('---------------------------------------------\n');
                // logError('Database Connection Close Error', { source: 'dbService', action: 'closeConnection', errorMessage: closeError.message || 'Bilinmeyen hata', additionalInfo: { stack: closeError.stack || 'Yok' } });
            }
        }
    }
};

export const executeSQL = async (sqlQuery: string, isList: boolean = false): Promise<any> => {
    let pool: ConnectionPool | undefined;

    try {
        pool = await new ConnectionPool(dbConfig).connect();
        const result = await pool.request().query(sqlQuery);
        if (isList) {
            return result.recordset;
        }
        return result.recordset[0];
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
};