import rabbitmqService from './rabbitmqService';
import envConfig from '../config/envConfig';

interface Task {
    id: string;
    type: string;
    data: any;
    createdAt: Date;
}

export class TaskProcessor {
    private static instance: TaskProcessor;

    private constructor() {
        this.initializeConsumer();
    }

    public static getInstance(): TaskProcessor {
        if (!TaskProcessor.instance) {
            TaskProcessor.instance = new TaskProcessor();
        }
        return TaskProcessor.instance;
    }

    private async initializeConsumer(): Promise<void> {
        try {
            await rabbitmqService.consumeMessage(envConfig.RABBITMQ.QUEUES.TASKS, async (message: Task) => {
                await this.processTask(message);
            });
            console.log('✅ Task işleyici başlatıldı');
        } catch (error) {
            console.error('❌ Task işleyici başlatma hatası:', error);
        }
    }

    private async processTask(task: Task): Promise<void> {
        console.log(`📝 Task işleniyor: ${task.id}`);
        
        try {
            switch (task.type) {
                case 'EMAIL':
                    await this.processEmailTask(task);
                    break;
                case 'NOTIFICATION':
                    await this.processNotificationTask(task);
                    break;
                case 'REPORT':
                    await this.processReportTask(task);
                    break;
                default:
                    console.warn(`⚠️ Bilinmeyen task tipi: ${task.type}`);
            }

            await this.sendTaskCompletionNotification(task);
        } catch (error) {
            console.error(`❌ Task işleme hatası (${task.id}):`, error);
            await this.sendTaskErrorNotification(task, error);
        }
    }

    private async processEmailTask(task: Task): Promise<void> {
        console.log(`📧 Email task işleniyor: ${task.id}`);
    }

    private async processNotificationTask(task: Task): Promise<void> {
        console.log(`🔔 Bildirim task işleniyor: ${task.id}`);
    }

    private async processReportTask(task: Task): Promise<void> {
        console.log(`📊 Rapor task işleniyor: ${task.id}`);
    }

    private async sendTaskCompletionNotification(task: Task): Promise<void> {
        await rabbitmqService.publishMessage(
            envConfig.RABBITMQ.EXCHANGES.NOTIFICATIONS,
            '',
            {
                type: 'TASK_COMPLETED',
                taskId: task.id,
                completedAt: new Date()
            }
        );
    }

    private async sendTaskErrorNotification(task: Task, error: any): Promise<void> {
        await rabbitmqService.publishMessage(
            envConfig.RABBITMQ.EXCHANGES.NOTIFICATIONS,
            '',
            {
                type: 'TASK_ERROR',
                taskId: task.id,
                error: error.message,
                timestamp: new Date()
            }
        );
    }

    public async enqueueTask(task: Task): Promise<boolean> {
        try {
            return await rabbitmqService.publishMessage(
                envConfig.RABBITMQ.EXCHANGES.TASKS,
                '',
                task
            );
        } catch (error) {
            console.error('Task kuyruğa eklenirken hata:', error);
            return false;
        }
    }
}

export default TaskProcessor.getInstance(); 