import { CreateSubscriptionDto } from './dto/create.dto';
import { UpdateSubscriptionDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubscriptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: CreateSubscriptionDto;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    findAll({ pag, limit }: {
        pag: number;
        limit: number;
    }): Promise<({
        users: {
            email: string;
            username: string;
            name: string;
            lastname: string;
            last_session: Date;
            _count: {
                profilePhotoReference: number;
                wallpaperPhotoReference: number;
                subscriptionReference: number;
                levelReference: number;
                session: number;
                notifications: number;
            };
        }[];
    } & {
        id: number;
        name: string;
        description: string;
    })[]>;
    findOne({ id }: {
        id: number;
    }): Promise<{
        users: {
            email: string;
            username: string;
            name: string;
            lastname: string;
            last_session: Date;
            _count: {
                profilePhotoReference: number;
                wallpaperPhotoReference: number;
                subscriptionReference: number;
                levelReference: number;
                session: number;
                notifications: number;
            };
        }[];
    } & {
        id: number;
        name: string;
        description: string;
    }>;
    update({ id, data }: {
        id: number;
        data: UpdateSubscriptionDto;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    remove(id: number): Promise<string>;
}
