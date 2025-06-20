import { Request, Response } from 'express';
import { executeSP, executeSQL } from '../services/dbService'
import { UserDTO } from '../models';
import { cacheService } from '../services/redisService';
import { getDbName } from '../utils/helperUtils';


export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.body.SessionUserID);
        const dbName = getDbName(req);

        const cachedUser = await cacheService.getUser(userId, dbName);
        if (cachedUser) {
            res.status(200).json(cachedUser);
            return;
        }

        // If not in cache, get from database
        const result = await executeSP('dbo.SP_Select_User', false, { SessionUserID: userId });

        // Cache the result
        if (result) {
            await cacheService.setUser(userId, result, dbName);
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Kullanıcı bilgileri alınırken hata:', error);
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
}

export const getMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.body.SessionUserID);
        const dbName = getDbName(req);

        const demoMenu = [
            {
                "title": "Dashboard",
                "path": "/admin",
                "icon": "bi bi-speedometer",
                "badge": "0"
            },
            {
                "title": "Satış Yönetimi",
                "icon": "bi bi-cart4",
                "badge": "0",
                "submenu": [
                    {
                        "title": "Yeni Satış",
                        "path": "/admin/sales/newSales",
                        "icon": "bi bi-cart-plus"
                    },
                    {
                        "title": "Satış Listesi",
                        "path": "/admin/sales",
                        "icon": "bi bi-basket"
                    },
                    {
                        "title": "Teklifler",
                        "path": "/admin/quotes",
                        "icon": "bi bi-file-earmark-text"
                    },
                    {
                        "title": "Taksitli Satışlar",
                        "path": "/admin/sales/installments",
                        "icon": "bi bi-credit-card-2-front"
                    }
                ]
            },
            {
                "title": "Müşteri Yönetimi",
                "icon": "bi bi-person-lines-fill",
                "badge": "0",
                "submenu": [
                    {
                        "title": "Müşteri Ekle",
                        "path": "/admin/customers/add",
                        "icon": "bi bi-person-plus"
                    },
                    {
                        "title": "Müşteri Listesi",
                        "path": "/admin/customers",
                        "icon": "bi bi-people-fill"
                    },
                    {
                        "title": "VIP Müşteriler",
                        "path": "/admin/customers/vip",
                        "icon": "bi bi-star-fill"
                    },
                    {
                        "title": "Müşteri Analizi",
                        "path": "/admin/customers/analytics",
                        "icon": "bi bi-graph-up-arrow"
                    }
                ]
            },
            {
                "title": "Ürün ve Stok",
                "icon": "bi bi-box2-heart",
                "badge": "0",
                "submenu": [
                    {
                        "title": "Ürün Ekle",
                        "path": "/admin/products/add",
                        "icon": "bi bi-plus-square"
                    },
                    {
                        "title": "Ürün Listesi",
                        "path": "/admin/products",
                        "icon": "bi bi-boxes"
                    },
                    {
                        "title": "Stok Takibi",
                        "path": "/admin/stock",
                        "icon": "bi bi-stack"
                    },
                    {
                        "title": "Altın Fiyatları",
                        "path": "/admin/gold-prices",
                        "icon": "bi bi-currency-bitcoin"
                    }
                ]
            },
            // {
            //     "title": "Cari Hesaplar",
            //     "icon": "bi bi-journal-text",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Cari Listesi",
            //             "path": "/admin/finance/ledger",
            //             "icon": "bi bi-card-list"
            //         },
            //         {
            //             "title": "Borç / Alacak Takibi",
            //             "path": "/admin/finance/balance",
            //             "icon": "bi bi-arrow-left-right"
            //         },
            //         {
            //             "title": "Tahsilatlar",
            //             "path": "/admin/finance/collections",
            //             "icon": "bi bi-wallet2"
            //         }
            //     ]
            // },
            // {
            //     "title": "Kuyumcu Defteri",
            //     "icon": "bi bi-journal-bookmark-fill",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Günlük Giriş-Çıkış",
            //             "path": "/admin/ledger/daily",
            //             "icon": "bi bi-calendar-check"
            //         },
            //         {
            //             "title": "Zayiat Takibi",
            //             "path": "/admin/ledger/waste-tracking",
            //             "icon": "bi bi-exclamation-triangle"
            //         },
            //         {
            //             "title": "Dönüşüm Takibi",
            //             "path": "/admin/ledger/conversions",
            //             "icon": "bi bi-arrow-clockwise"
            //         }
            //     ]
            // },
            // {
            //     "title": "Hammadde Takibi",
            //     "icon": "bi bi-boxes",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Hammadde Girişi",
            //             "path": "/admin/raw-materials/in",
            //             "icon": "bi bi-box-arrow-in-down"
            //         },
            //         {
            //             "title": "Hammadde Çıkışı",
            //             "path": "/admin/raw-materials/out",
            //             "icon": "bi bi-box-arrow-up"
            //         },
            //         {
            //             "title": "Mevcut Hammadde",
            //             "path": "/admin/raw-materials",
            //             "icon": "bi bi-box"
            //         }
            //     ]
            // },
            // {
            //     "title": "İade İşlemleri",
            //     "icon": "bi bi-arrow-return-left",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Ürün İadesi",
            //             "path": "/admin/returns/products",
            //             "icon": "bi bi-arrow-counterclockwise"
            //         },
            //         {
            //             "title": "Müşteri İade Geçmişi",
            //             "path": "/admin/returns/history",
            //             "icon": "bi bi-clock-history"
            //         }
            //     ]
            // },
            // {
            //     "title": "Servis ve Destek",
            //     "icon": "bi bi-tools",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Servis Kaydı Oluştur",
            //             "path": "/admin/support/add",
            //             "icon": "bi bi-journal-plus"
            //         },
            //         {
            //             "title": "Servis Listesi",
            //             "path": "/admin/support",
            //             "icon": "bi bi-wrench"
            //         },
            //         {
            //             "title": "Garanti Takibi",
            //             "path": "/admin/warranty",
            //             "icon": "bi bi-shield-check"
            //         }
            //     ]
            // },
            // {
            //     "title": "Kampanyalar",
            //     "icon": "bi bi-megaphone-fill",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Kampanya Oluştur",
            //             "path": "/admin/campaigns/add",
            //             "icon": "bi bi-plus-circle"
            //         },
            //         {
            //             "title": "Kampanya Listesi",
            //             "path": "/admin/campaigns",
            //             "icon": "bi bi-ui-checks"
            //         },
            //         {
            //             "title": "SMS & Mail Gönderimi",
            //             "path": "/admin/campaigns/send",
            //             "icon": "bi bi-envelope-paper"
            //         }
            //     ]
            // },
            // {
            //     "title": "Döviz ve Kıymetli Madenler",
            //     "icon": "bi bi-currency-exchange",
            //     "badge": "0",
            //     "submenu": [
            //         {
            //             "title": "Döviz Kurları",
            //             "path": "/admin/exchange-rates",
            //             "icon": "bi bi-bank"
            //         },
            //         {
            //             "title": "Altın / Gümüş Değerleri",
            //             "path": "/admin/precious-metals",
            //             "icon": "bi bi-gem"
            //         }
            //     ]
            // },
            {
                "title": "Raporlar",
                "icon": "bi bi-bar-chart-fill",
                "badge": "0",
                "submenu": [
                    {
                        "title": "Satış Raporları",
                        "path": "/admin/reports/sales",
                        "icon": "bi bi-file-bar-graph"
                    },
                    {
                        "title": "Stok Raporları",
                        "path": "/admin/reports/stock",
                        "icon": "bi bi-bar-chart-line-fill"
                    },
                    {
                        "title": "Müşteri Raporları",
                        "path": "/admin/reports/customers",
                        "icon": "bi bi-person-lines-fill"
                    }
                ]
            },
            {
                "title": "Kullanıcı Yönetimi",
                "icon": "bi bi-person-vcard",
                "badge": "0",
                "submenu": [
                    {
                        "title": "Kullanıcı Listesi",
                        "path": "/admin/users",
                        "icon": "bi bi-people"
                    },
                    {
                        "title": "Rol ve Yetkiler",
                        "path": "/admin/roles",
                        "icon": "bi bi-person-lock"
                    }
                ]
            },
            {
                "title": "Ayarlar",
                "path": "/admin/settings",
                "icon": "bi bi-gear-fill",
                "badge": "0"
            }
        ]

        // Try to get menu from cache first
        // const cachedMenu = await cacheService.getMenu(userId, dbName);
        // if (cachedMenu) {
        //     res.status(200).json(cachedMenu);
        //     return;
        // }

        // If not in cache, get from database
        const result = await executeSP('dbo.SP_Select_Menu', false, { SessionUserID: userId });
        const menuItems = JSON.parse(result.menu);

        // Cache the result
        if (menuItems) {
            await cacheService.setMenu(userId, menuItems, dbName);
        }

        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Menü bilgileri alınırken hata:', error);
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
}

export const saveMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.body.SessionUserID);
        const dbName = getDbName(req);
        const menuItems = req.body.menuItems;

        const result = await executeSP('dbo.SP_Save_Menu', false, { SessionUserID: userId });

        // Clear menu cache after update
        await cacheService.deleteMenu(userId, dbName);

        res.status(200).json(result);
    } catch (error) {
        console.error('Menü kaydedilirken hata:', error);
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
}

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.body.SessionUserID);
        const dbName = getDbName(req);

        // // Try to get notifications from cache
        // const cachedNotifications = await cacheService.getNotifications(userId, dbName);
        // if (cachedNotifications) {
        //     res.status(200).json(cachedNotifications);
        //     return;
        // }

        // If not in cache, get default notifications
        const result = [
            {
                ID: 1,
                Title: 'Bildirim Yok',
                Message: 'Bildirim yok.',
                Date: new Date()
            }
        ];

        // // Cache the notifications
        // await cacheService.setNotifications(userId, result, dbName);

        res.status(200).json(result);
    } catch (error) {
        console.error('Bildirimler alınırken hata:', error);
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
}

export const readNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.body.SessionUserID);
        const dbName = getDbName(req);
        const user = new UserDTO(req.body);

        await executeSP('dbo.SP_Update_Notification', false, { SessionUserID: userId });

        // Clear notifications cache
        // await cacheService.deleteNotifications(userId, dbName);

        res.status(200).json({ statu: true, title: 'Başarılı', message: 'Bildirim okundu.' });
    } catch (error) {
        console.error('Bildirim okunurken hata:', error);
        res.status(500).json({ statu: false, title: 'Hata', message: 'İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
    }
}

// Yeni cache temizleme endpointleri
export const clearUserCache = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.userId);
        const dbName = getDbName(req);

        await cacheService.clearUserCache(userId, dbName);

        res.status(200).json({
            statu: true,
            title: 'Başarılı',
            message: `${userId} ID'li kullanıcının önbelleği temizlendi.`
        });
    } catch (error) {
        console.error('Kullanıcı önbelleği temizlenirken hata:', error);
        res.status(500).json({
            statu: false,
            title: 'Hata',
            message: 'Önbellek temizleme işlemi sırasında bir hata oluştu.'
        });
    }
};

export const clearDatabaseCache = async (req: Request, res: Response): Promise<void> => {
    try {
        const dbName = getDbName(req);

        await cacheService.clearDatabaseCache(dbName);

        res.status(200).json({
            statu: true,
            title: 'Başarılı',
            message: `${dbName} veritabanının tüm önbelleği temizlendi.`
        });
    } catch (error) {
        console.error('Veritabanı önbelleği temizlenirken hata:', error);
        res.status(500).json({
            statu: false,
            title: 'Hata',
            message: 'Önbellek temizleme işlemi sırasında bir hata oluştu.'
        });
    }
};

export const clearAllCache = async (req: Request, res: Response): Promise<void> => {
    try {
        await cacheService.clearByPattern('*');

        res.status(200).json({
            statu: true,
            title: 'Başarılı',
            message: 'Tüm önbellek başarıyla temizlendi.'
        });
    } catch (error) {
        console.error('Tüm önbellek temizlenirken hata:', error);
        res.status(500).json({
            statu: false,
            title: 'Hata',
            message: 'Önbellek temizleme işlemi sırasında bir hata oluştu.'
        });
    }
};





