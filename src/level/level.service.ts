import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLevelDto } from './dto/create.dto';
import { UpdateLevelDto } from './dto/update.dto';

@Injectable()
export class LevelService {

    constructor(
        private prisma: PrismaService,
    ) {}

    public async findAll({ pag, limit }: { pag:number, limit:number }) {
        const entity = this.prisma.masterLevels.findMany({
            skip: pag*limit,
            take: limit,
            include: {
                users: {
                    select: {
                        _count: true,
                        email: true,
                        lastname: true,
                        name: true,
                        username: true,
                        last_session: true
                    }
                }
            }
        });
        return entity
    }

    public async find({ id }: { id:number }) {
        const entity = this.prisma.masterLevels.findFirst({ 
            where: {id},
            include: {
                users: {
                    select: {
                        email: true,
                        lastname: true,
                        name: true,
                        rol: true,
                        username: true,
                        last_session: true
                    }
                }
            }
        });
        return entity;
    }

    public async create({ data }: { data:CreateLevelDto }) {
        const entity = this.prisma.masterLevels.create({ data });
        return entity;
    }

    public async update({ data, id }: { data: UpdateLevelDto, id:number }) {
        const entity = this.prisma.masterLevels.update({
            data,
            where: { id }
        });
        return entity;
    }

}
