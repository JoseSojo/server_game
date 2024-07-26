import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/global/prisma.service';
export declare class LevelService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLevelDto): Promise<{
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__MasterLevelsClient<{
        id: number;
        name: string;
        description: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: UpdateLevelDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    remove(id: number): Promise<number>;
}
