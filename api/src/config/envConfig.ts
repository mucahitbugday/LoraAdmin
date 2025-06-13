import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  DATABASE: {
    HOST: string;
    USER: string;
    PASSWORD: string;
    NAME: string;
    PORT: number;
  };
  REDIS: {
    HOST: string;
    PORT: number;
    PASSWORD: string | null;
  };
  RABBITMQ: {
    URL: string;
    USER: string;
    PASSWORD: string;
    QUEUES: {
      TASKS: string;
      NOTIFICATIONS: string;
      LOGS: string;
    };
    EXCHANGES: {
      TASKS: string;
      NOTIFICATIONS: string;
      LOGS: string;
    };
  };
}

// Default configuration
const defaultConfig: Config = {
  NODE_ENV: 'development',
  PORT: 2140,
  JWT_SECRET: 'default-secret-key-change-in-production',
  JWT_EXPIRATION: '100000h',
  DATABASE: {
    HOST: '100.68.72.10',
    USER: 'sa',
    PASSWORD: '2012696@MCbd',
    NAME: 'crmdemo',
    PORT: 1433,
  },
  REDIS: {
    HOST: '100.68.72.10',
    PORT: 6379,
    PASSWORD: null,
  },
  RABBITMQ: {
    URL: '100.68.72.10',
    USER: 'guest',
    PASSWORD: 'guest',
    QUEUES: {
      TASKS: 'tasks_queue',
      NOTIFICATIONS: 'notifications_queue',
      LOGS: 'logs_queue'
    },
    EXCHANGES: {
      TASKS: 'tasks_exchange',
      NOTIFICATIONS: 'notifications_exchange',
      LOGS: 'logs_exchange'
    }
  }
};

// Environment specific configuration
const envConfig: Config = {
  NODE_ENV: process.env.NODE_ENV || defaultConfig.NODE_ENV,
  PORT: Number(process.env.PORT) || defaultConfig.PORT,
  JWT_SECRET: process.env.JWT_SECRET || defaultConfig.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || defaultConfig.JWT_EXPIRATION,
  DATABASE: {
    HOST: process.env.DB_HOST || defaultConfig.DATABASE.HOST,
    USER: process.env.DB_USER || defaultConfig.DATABASE.USER,
    PASSWORD: process.env.DB_PASSWORD || defaultConfig.DATABASE.PASSWORD,
    NAME: process.env.DB_NAME || defaultConfig.DATABASE.NAME,
    PORT: Number(process.env.DB_PORT) || defaultConfig.DATABASE.PORT,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || defaultConfig.REDIS.HOST,
    PORT: Number(process.env.REDIS_PORT) || defaultConfig.REDIS.PORT,
    PASSWORD: process.env.REDIS_PASSWORD || defaultConfig.REDIS.PASSWORD,
  },
  RABBITMQ: {
    URL: process.env.RABBITMQ_URL || defaultConfig.RABBITMQ.URL,
    USER: process.env.RABBITMQ_USER || defaultConfig.RABBITMQ.USER,
    PASSWORD: process.env.RABBITMQ_PASSWORD || defaultConfig.RABBITMQ.PASSWORD,
    QUEUES: {
      TASKS: process.env.RABBITMQ_QUEUE_TASKS || defaultConfig.RABBITMQ.QUEUES.TASKS,
      NOTIFICATIONS: process.env.RABBITMQ_QUEUE_NOTIFICATIONS || defaultConfig.RABBITMQ.QUEUES.NOTIFICATIONS,
      LOGS: process.env.RABBITMQ_QUEUE_LOGS || defaultConfig.RABBITMQ.QUEUES.LOGS
    },
    EXCHANGES: {
      TASKS: process.env.RABBITMQ_EXCHANGE_TASKS || defaultConfig.RABBITMQ.EXCHANGES.TASKS,
      NOTIFICATIONS: process.env.RABBITMQ_EXCHANGE_NOTIFICATIONS || defaultConfig.RABBITMQ.EXCHANGES.NOTIFICATIONS,
      LOGS: process.env.RABBITMQ_EXCHANGE_LOGS || defaultConfig.RABBITMQ.EXCHANGES.LOGS
    }
  }
};

export default envConfig; 