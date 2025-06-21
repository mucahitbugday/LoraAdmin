import { Request, Response } from 'express';
import { executeSP, executeSQL } from '../services/dbService'
import { getDbName, getProcedureParams } from '../utils/helperUtils';
import { cacheService } from '../services/redisService';

export const getGlobalPageList = async (req: Request, res: Response): Promise<void> => {
    try {
        const SessionUserID = Number(req.body.SessionUserID);
        const menuPath = req.body.req.pathname;
        const filters = req.body.req.filterFields || [];
        const orderBy = req.body.req.orderBy || '1 DESC';
        const pageNumber = req.body.req.page || 1
        const pageLimit = req.body.req.pageLimit || 50

        const spNameResult = await executeSQL(`SELECT ProcedureName FROM dbo.SetupMenu WHERE Path = '${menuPath}'`, false);
        const spName = spNameResult?.ProcedureName;

        const procParams = await getProcedureParams(spName);
        const spParams: Record<string, any> = {};

        if (procParams.includes('SessionUserID')) spParams['SessionUserID'] = SessionUserID;
        if (procParams.includes('pageNumber')) spParams['pageNumber'] = pageNumber;
        if (procParams.includes('pageLimit')) spParams['pageLimit'] = pageLimit;
        if (procParams.includes('pageOrderBy')) spParams['pageOrderBy'] = orderBy;

        for (const filter of filters) {
            if (procParams.includes(filter.key)) {
                spParams[filter.key] = filter.value;
            }
        }

        const result = await executeSP(spName, false, spParams);

        // console.log('getGlobalPageList result0:', result[0][0]);
        // console.log('getGlobalPageList result1:', result[1]);
        // console.log('getGlobalPageList result2:', result[2]);
        // console.log('getGlobalPageList result3:', result[3]);

        res.status(200).json({
            pageTitle: result[0][0]?.pageTitle || 'Sayfa Başlığı',
            page: result[0][0]?.page || 1,
            orderBy: result[0][0]?.orderBy || '1 DESC',
            pageTodalCount: result[0][0]?.pageTodalCount || 1,
            butons: result[1] || [],
            filterFields: result[2] || [],
            data: result[3] || [],
        });
    } catch (error) {
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.', });
    }
}


export const agetGlobalPageList = async (req: Request, res: Response): Promise<void> => {
    try {
        try {
            const userId = Number(req.body.SessionUserID);
            const menuPath = req.body.MenuPath;
            const dbName = getDbName(req);

            await cacheService.clearDatabaseCache(dbName);

            const cachedPageFilters = await cacheService.getPageFilters(menuPath, dbName);
            if (cachedPageFilters) {
                const data = JSON.parse(cachedPageFilters || '{}');
                const pageFilters = data.map((filter: any) => ({
                    field: filter.field,
                    label: filter.label,
                    type: filter.type,
                    options: JSON.parse(filter.options || '[]')
                }));
                res.status(200).json(pageFilters);
                return;
            }

            const result = await executeSP('dbo.SP_Select_PageFilters', false, { MenuPath: menuPath });
            const data = JSON.parse(result.pageFilters);
            const pageFilters = data.map((filter: any) => ({
                field: filter.field,
                label: filter.label,
                type: filter.type,
                options: JSON.parse(filter.options || '[]')
            }));

            // Cache the result
            if (result) {
                await cacheService.setPageFilters(menuPath, result, dbName, userId);
            }

            res.status(200).json(pageFilters);
        } catch (error) {
            console.error('Kullanıcı bilgileri alınırken hata:', error);
            res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
        }


    } catch (error) {
        console.error('getPageFilters hata:', error);
    }
}



export const getKanbanPageData = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuPath = req.body.MenuPath;
        // const result = await executeSP('dbo.SP_Select_KanbanPageData', false, { MenuPath: menuPath });
        const result = [
            {
                ColumnID: '1',
                ColumnName: 'Yapılacaklar',
                ColumnDescription: 'Henüz başlanmamış görevler',
                ColumnStatus: 'active',
                Tasks: [
                    {
                        TaskID: '1-1',
                        TaskName: 'Görev 1',
                        TaskDescription: 'Yapılacak ilk görev',
                        TaskStatus: 'active',
                    },
                    {
                        TaskID: '1-2',
                        TaskName: 'Görev 2',
                        TaskDescription: 'İkinci görev açıklaması',
                        TaskStatus: 'pending',
                    },
                ],
            },
            {
                ColumnID: '2',
                ColumnName: 'Devam Edenler',
                ColumnDescription: 'Üzerinde çalışılan görevler',
                ColumnStatus: 'active',
                Tasks: [
                    {
                        TaskID: '2-1',
                        TaskName: 'Görev 3',
                        TaskDescription: 'Devam eden görev açıklaması',
                        TaskStatus: 'in-progress',
                    },
                    {
                        TaskID: '2-2',
                        TaskName: 'Görev 4',
                        TaskDescription: 'Bir başka aktif görev',
                        TaskStatus: 'in-progress',
                    },
                ],
            },
            {
                ColumnID: '3',
                ColumnName: 'Tamamlananlar',
                ColumnDescription: 'Tamamlanmış görevler',
                ColumnStatus: 'archived',
                Tasks: [
                    {
                        TaskID: '3-1',
                        TaskName: 'Görev 5',
                        TaskDescription: 'Bitmiş görev açıklaması',
                        TaskStatus: 'done',
                    },
                    {
                        TaskID: '3-2',
                        TaskName: 'Görev 6',
                        TaskDescription: 'Tamamlanmış görev',
                        TaskStatus: 'done',
                    },
                ],
            },
        ];

        res.status(200).json(result);
    } catch (error) {
        console.error('getKanbanPageData hata:', error);
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
}
