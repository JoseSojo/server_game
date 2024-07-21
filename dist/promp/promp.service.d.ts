import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrompDto } from './dto/create.dto';
export declare class PrompService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: CreatePrompDto;
    }): Promise<{
        id: number;
        message: string;
        origin: boolean;
        createAt: Date;
        senseiId: number;
    }>;
}
