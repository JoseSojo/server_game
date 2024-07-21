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

}
