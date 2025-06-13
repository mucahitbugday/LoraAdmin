import { Channel, Connection, connect, ConsumeMessage } from 'amqplib';
import envConfig from '../config/envConfig';

class RabbitMQService {
    private static instance: RabbitMQService;
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    private constructor() {}

    public static getInstance(): RabbitMQService {
        if (!RabbitMQService.instance) {
            RabbitMQService.instance = new RabbitMQService();
        }
        return RabbitMQService.instance;
    }

    public async connect(): Promise<void> {
        try {
            const conn = await connect(envConfig.RABBITMQ.URL);
            this.connection = conn as unknown as Connection;
            this.channel = await conn.createChannel() as unknown as Channel;

            // Setup exchanges
            await this.setupExchanges();
            // Setup queues
            await this.setupQueues();

            console.log('✅ RabbitMQ bağlantısı başarılı');

            this.connection.on('error', (err: Error) => {
                console.error('RabbitMQ bağlantı hatası: 1');
                this.reconnect();
            });

            this.connection.on('close', () => {
                console.error('RabbitMQ bağlantısı kapandı, yeniden bağlanılıyor...');
                this.reconnect();
            });

        } catch (error) {
            // console.error('RabbitMQ bağlantı hatası: 2');
            throw error;
        }
    }

    private async setupExchanges(): Promise<void> {
        if (!this.channel) return;

        await this.channel.assertExchange(envConfig.RABBITMQ.EXCHANGES.TASKS, 'direct', { durable: true });
        await this.channel.assertExchange(envConfig.RABBITMQ.EXCHANGES.NOTIFICATIONS, 'fanout', { durable: true });
        await this.channel.assertExchange(envConfig.RABBITMQ.EXCHANGES.LOGS, 'topic', { durable: true });
    }

    private async setupQueues(): Promise<void> {
        if (!this.channel) return;

        await this.channel.assertQueue(envConfig.RABBITMQ.QUEUES.TASKS, { durable: true });
        await this.channel.assertQueue(envConfig.RABBITMQ.QUEUES.NOTIFICATIONS, { durable: true });
        await this.channel.assertQueue(envConfig.RABBITMQ.QUEUES.LOGS, { durable: true });

        // Bind queues to exchanges
        await this.channel.bindQueue(envConfig.RABBITMQ.QUEUES.TASKS, envConfig.RABBITMQ.EXCHANGES.TASKS, '');
        await this.channel.bindQueue(envConfig.RABBITMQ.QUEUES.NOTIFICATIONS, envConfig.RABBITMQ.EXCHANGES.NOTIFICATIONS, '');
        await this.channel.bindQueue(envConfig.RABBITMQ.QUEUES.LOGS, envConfig.RABBITMQ.EXCHANGES.LOGS, '#');
    }

    private async reconnect(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await (this.connection as any).close();
            }
        } catch (error) {
            console.error('Bağlantı kapatma hatası:', error);
        }

        setTimeout(async () => {
            try {
                await this.connect();
            } catch (error) {
                console.error('Yeniden bağlanma hatası:', error);
            }
        }, 5000);
    }

    public async publishMessage(exchange: string, routingKey: string, message: any): Promise<boolean> {
        try {
            if (!this.channel) {
                throw new Error('RabbitMQ kanalı bulunamadı');
            }

            const messageBuffer = Buffer.from(JSON.stringify(message));
            return this.channel.publish(exchange, routingKey, messageBuffer, {
                persistent: true,
                contentType: 'application/json'
            });
        } catch (error) {
            console.error('Mesaj gönderme hatası:', error);
            return false;
        }
    }

    public async consumeMessage(queue: string, callback: (message: any) => Promise<void>): Promise<void> {
        try {
            if (!this.channel) {
                throw new Error('RabbitMQ kanalı bulunamadı');
            }

            await this.channel.consume(queue, async (msg: ConsumeMessage | null) => {
                if (msg) {
                    try {
                        const content = JSON.parse(msg.content.toString());
                        await callback(content);
                        this.channel?.ack(msg);
                    } catch (error) {
                        console.error('Mesaj işleme hatası:', error);
                        this.channel?.nack(msg, false, true);
                    }
                }
            });
        } catch (error) {
            console.error('Mesaj tüketme hatası:', error);
            throw error;
        }
    }

    public async closeConnection(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await (this.connection as any).close();
            }
        } catch (error) {
            console.error('Bağlantı kapatma hatası:', error);
        }
    }
}

export default RabbitMQService.getInstance(); 