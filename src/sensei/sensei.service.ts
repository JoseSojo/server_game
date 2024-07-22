import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrompService } from 'src/promp/promp.service';
import { CreateSenseiDto } from './dto/create.dto';
import axios from 'axios';

@Injectable()
export class SenseiService {

    constructor(
        private prisma: PrismaService,
        private promp: PrompService,
    ) {}

    public async create({ data }: { data: CreateSenseiDto }) {
        const entity = this.prisma.sensei.create({ data });
        return entity;
    } 

    public async update({ data, id }: { data: CreateSenseiDto, id:number }) {
        const entity = this.prisma.sensei.update({ data, where:{id} });
        return entity;
    } 

    public async findForValidate({ id, name }: { id:number, name:string }) {
        const entity = this.prisma.sensei.findFirst({
            where: {
                userId: id,
                name: name,
            }
        });
        return entity;
    }

    public async getSenseisByUser({id, pag, limit}:{id:number, pag:number, limit: number}) {
        const entity = this.prisma.sensei.findMany({
            include: {
                _count: {
                    select: {
                        propmsQuery: true,
                    }
                }
            },
            skip: pag*limit,
            take: limit,
            where: {
                userId: id,
            }
        });
        return entity;
    }

    public async getBitcoinPriceUSD() {

        const API_KEY = `c15a22e4-df48-4a51-840f-5033321d428c`;
        const url = `https://api.deep.ai/v1/Q&A`;
        const promp = `Simula ser especialista en matemáticas, y dama la suma de 20 + 20`;

        try {
            const response = await fetch(url, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: promp
            })
        } catch (error) {
            console.log(error);
        }

        console.log([]);
                     
    }

}
