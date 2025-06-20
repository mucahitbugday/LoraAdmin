import { Request } from 'express';
import { executeSQL } from '../services/dbService';

export const getDbName = (req: Request): string => {
    return req.headers['x-database-name'] as string || 'default';
};

// Prosedür parametrelerini getiren yardımcı fonksiyon
export const getProcedureParams = async (procedureName: string): Promise<string[]> => {
    const params = await executeSQL(
        `
        SELECT PARAMETER_NAME 
        FROM INFORMATION_SCHEMA.PARAMETERS 
        WHERE SPECIFIC_NAME = '${procedureName}'
        `,
        true
    );

    return params.map((p: any) => p.PARAMETER_NAME.replace('@', '')); // Küçük harfli karşılaştırma için
};