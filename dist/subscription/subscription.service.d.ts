import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/global/prisma.service';
export declare class SubscriptionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSubscriptionDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    findAll({ skip, take, options }: {
        skip: number;
        take: number;
        options?: any;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__MasterSubscriptionsClient<{
        id: number;
        name: string;
        description: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: UpdateSubscriptionDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    remove(id: number): Promise<number>;
}
