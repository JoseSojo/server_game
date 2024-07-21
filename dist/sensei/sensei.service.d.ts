import { PrismaService } from 'src/prisma/prisma.service';
import { PrompService } from 'src/promp/promp.service';
import { CreateSenseiDto } from './dto/create.dto';
import { HttpService } from '@nestjs/axios';
export declare class SenseiService {
    private prisma;
    private promp;
    private http;
    constructor(prisma: PrismaService, promp: PrompService, http: HttpService);
    create({ data }: {
        data: CreateSenseiDto;
    }): Promise<{
        id: number;
        name: string;
        tema: string;
        userId: number;
        createAt: Date;
        updateAt: Date;
        deleteAt: Date | null;
    }>;
    update({ data, id }: {
        data: CreateSenseiDto;
        id: number;
    }): Promise<{
        id: number;
        name: string;
        tema: string;
        userId: number;
        createAt: Date;
        updateAt: Date;
        deleteAt: Date | null;
    }>;
    findForValidate({ id, name }: {
        id: number;
        name: string;
    }): Promise<{
        id: number;
        name: string;
        tema: string;
        userId: number;
        createAt: Date;
        updateAt: Date;
        deleteAt: Date | null;
    }>;
    getSenseisByUser({ id, pag, limit }: {
        id: number;
        pag: number;
        limit: number;
    }): Promise<({
        _count: {
            propmsQuery: number;
        };
    } & {
        id: number;
        name: string;
        tema: string;
        userId: number;
        createAt: Date;
        updateAt: Date;
        deleteAt: Date | null;
    })[]>;
    getBitcoinPriceUSD(): Promise<void>;
}
