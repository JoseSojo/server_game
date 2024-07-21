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
        limitSensei: number;
    }>;
    findAll({ pag, limit }: {
        pag: number;
        limit: number;
    }): Promise<({
        users: {
            name: string;
            lastname: string;
            email: string;
            username: string;
            last_session: Date;
            _count: {
                profilePhotoReference: number;
                wallpaperPhotoReference: number;
                subscriptionReference: number;
                levelReference: number;
                session: number;
                notifications: number;
                senseis: number;
            };
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        limitSensei: number;
    })[]>;
    findOne({ id }: {
        id: number;
    }): Promise<{
        users: {
            name: string;
            lastname: string;
            email: string;
            username: string;
            last_session: Date;
            _count: {
                profilePhotoReference: number;
                wallpaperPhotoReference: number;
                subscriptionReference: number;
                levelReference: number;
                session: number;
                notifications: number;
                senseis: number;
            };
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        limitSensei: number;
    }>;
    update({ id, data }: {
        id: number;
        data: UpdateSubscriptionDto;
    }): Promise<{
        id: number;
        name: string;
        description: string;
        limitSensei: number;
    }>;
    remove(id: number): Promise<string>;
}
