import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create.dto';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: CreateNotificationDto;
    }): Promise<{
        id: number;
        userId: number;
        content: string;
        redirect: string;
        type: string;
        by: string;
        read: boolean;
        createAt: Date;
    }>;
    getPaginate({ pag, limit, userId }: {
        pag: number;
        limit: number;
        userId: number;
    }): Promise<({
        userReference: {
            name: string;
            lastname: string;
            email: string;
            username: string;
            last_session: Date;
            rol: string;
        };
    } & {
        id: number;
        userId: number;
        content: string;
        redirect: string;
        type: string;
        by: string;
        read: boolean;
        createAt: Date;
    })[]>;
    read({ id }: {
        id: number;
    }): Promise<{
        id: number;
        userId: number;
        content: string;
        redirect: string;
        type: string;
        by: string;
        read: boolean;
        createAt: Date;
    }>;
}
