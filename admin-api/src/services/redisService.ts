import Redis from 'ioredis';
import envConfig from '../config/envConfig';

const redis = new Redis({
    host: envConfig.REDIS.HOST,
    port: envConfig.REDIS.PORT,
    password: envConfig.REDIS.PASSWORD || undefined,
});

// Cache key prefixes
export const CACHE_KEYS = {
    USER_DATA: {
        PREFIX: 'user:data:',
        PROFILE: 'profile',
        MENU: 'menu',
        NOTIFICATIONS: 'notifications',
        SETTINGS: 'settings'
    },
    GLOBAL: {
        SYSTEM_SETTINGS: 'system:settings',
        COMMON_DATA: 'common:data'
    },
    DB: {
        PREFIX: 'db:'
    },
    PAGE_FILTERS: {
        PREFIX: 'page:filters:'
    }
};

// Default cache duration (1 hour)
const DEFAULT_CACHE_DURATION = 3600;

export const cacheService = {
    // Helper method to generate database-specific key
    generateDbKey(dbName: string, key: string): string {
        return `${CACHE_KEYS.DB.PREFIX}${dbName}:${key}`;
    },

    // Set data in cache
    async set(key: string, data: any, duration: number = DEFAULT_CACHE_DURATION): Promise<void> {
        try {
            await redis.setex(key, duration, JSON.stringify(data));
        } catch (error) {
            console.error('Redis cache set error:', error);
        }
    },

    // Get data from cache
    async get(key: string): Promise<any | null> {
        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Redis cache get error:', error);
            return null;
        }
    },

    // Delete specific cache
    async delete(key: string): Promise<void> {
        try {
            await redis.del(key);
        } catch (error) {
            console.error('Redis cache delete error:', error);
        }
    },

    // Clear cache by pattern
    async clearByPattern(pattern: string): Promise<void> {
        try {
            const keys = await redis.keys(pattern);
            if (keys.length > 0) {
                await redis.del(...keys);
            }
        } catch (error) {
            console.error('Redis cache clear error:', error);
        }
    },

    // User specific methods with database support
    async getUser(userId: number, dbName: string): Promise<any | null> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:${CACHE_KEYS.USER_DATA.PROFILE}`);
        return this.get(key);
    },

    async setUser(userId: number, userData: any, dbName: string): Promise<void> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:${CACHE_KEYS.USER_DATA.PROFILE}`);
        await this.set(key, userData);
    },

    async deleteUser(userId: number, dbName: string): Promise<void> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:${CACHE_KEYS.USER_DATA.PROFILE}`);
        await this.delete(key);
    },

    // Menu specific methods with database support
    async getMenu(userId: number, dbName: string): Promise<any | null> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:${CACHE_KEYS.USER_DATA.MENU}`);
        return this.get(key);
    },

    async setMenu(userId: number, menuData: any, dbName: string): Promise<void> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:${CACHE_KEYS.USER_DATA.MENU}`);
        await this.set(key, menuData);
    },

    async deleteMenu(userId: number, dbName: string): Promise<void> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:${CACHE_KEYS.USER_DATA.MENU}`);
        await this.delete(key);
    },

    // Page filters specific methods with database support
    async getPageFilters(menuPath: string, dbName: string): Promise<any | null> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.PAGE_FILTERS.PREFIX}${menuPath}`);
        return this.get(key);
    },

    async setPageFilters(menuPath: string, pageFilters: any, dbName: string, userId: number): Promise<void> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.PAGE_FILTERS.PREFIX}${menuPath}:${userId}`);
        await this.set(key, pageFilters);
    },

    async deletePageFilters(menuPath: string, dbName: string): Promise<void> {
        const key = this.generateDbKey(dbName, `${CACHE_KEYS.PAGE_FILTERS.PREFIX}${menuPath}`);
        await this.delete(key);
    },

    // Clear all user related cache for specific database
    async clearUserCache(userId: number, dbName: string): Promise<void> {
        const pattern = this.generateDbKey(dbName, `${CACHE_KEYS.USER_DATA.PREFIX}${userId}:*`);
        await this.clearByPattern(pattern);
    },

    // Clear all cache for specific database
    async clearDatabaseCache(dbName: string): Promise<void> {
        const pattern = this.generateDbKey(dbName, '*');
        await this.clearByPattern(pattern);
    }
}; 