import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import envConfig from '../config/envConfig';
 
const redis = new Redis({
  host: envConfig.REDIS.HOST,
  port: envConfig.REDIS.PORT,
  password: envConfig.REDIS.PASSWORD || undefined,
});

interface CacheOptions {
  duration?: number; // Cache duration in seconds
  key?: string | ((req: Request) => string); // Custom key or key generator
}

const defaultOptions: CacheOptions = {
  duration: 3600, // 1 hour default
};

export const cacheMiddleware = (options: CacheOptions = {}) => {
  const { duration = defaultOptions.duration, key } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Generate cache key
      const cacheKey = typeof key === 'function' 
        ? key(req)
        : key || `${req.method}:${req.originalUrl}`;

      // Try to get cached response
      const cachedResponse = await redis.get(cacheKey);

      if (cachedResponse) {
        res.json(JSON.parse(cachedResponse));
        return;
      }

      // Store original res.json method
      const originalJson = res.json;

      // Override res.json method to cache the response
      res.json = function (body: any): Response {
        // Restore original res.json method
        res.json = originalJson;

        // Cache the response
        redis.setex(cacheKey, duration!, JSON.stringify(body))
          .catch(err => console.error('Cache storage error:', err));

        // Send the response
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

// Cache clear utility
export const clearCache = async (pattern: string): Promise<void> => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Cache clear error:', error);
  }
};

export default cacheMiddleware; 