import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrompDto } from './dto/create.dto';

@Injectable()
export class PrompService {

    constructor(
        private prisma: PrismaService,
    ) {}
    
    public async create({ data }: { data:CreatePrompDto }) {
        const entity = this.prisma.senseiChat.create({ data });
        return entity;
    }

    public async findAll({ limit, skip, id }: { limit: number, skip: number, id: number }) {
        const entity = this.prisma.senseiChat.findMany({
            where: { senseiId: id },
            skip: skip,
            take: limit,
        })
        return entity;
    }

}
