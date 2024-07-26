import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/global/prisma.service';
export declare class GameService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateGameDto): Promise<{
        id: number;
        name: string;
        devices: string;
    }>;
    findAll({ skip, take, options }: {
        skip: number;
        take: number;
        options?: any;
    }): Promise<{
        id: number;
        name: string;
        devices: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__GameClient<{
        id: number;
        name: string;
        devices: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: UpdateGameDto): Promise<{
        id: number;
        name: string;
        devices: string;
    }>;
    remove(id: number): Promise<number>;
}
