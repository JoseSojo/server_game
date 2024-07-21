import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLevelDto } from './dto/create.dto';
import { UpdateLevelDto } from './dto/update.dto';
export declare class LevelService {
    private prisma;
    constructor(prisma: PrismaService);
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
    })[]>;
    find({ id }: {
        id: number;
    }): Promise<{
        users: {
            name: string;
            lastname: string;
            email: string;
            username: string;
            last_session: Date;
            rol: string;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
    }>;
    create({ data }: {
        data: CreateLevelDto;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    update({ data, id }: {
        data: UpdateLevelDto;
        id: number;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
}
