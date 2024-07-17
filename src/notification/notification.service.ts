import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create.dto';

@Injectable()
export class NotificationService {

    constructor(
        private prisma: PrismaService,
    ) {}

    public async create({data}: {data:CreateNotificationDto}) {
        const entity = this.prisma.notification.create({ data });
        return entity;
    }

    public async getPaginate({ pag, limit, userId }: { pag:number, limit:number, userId:number }) {
        const entity = this.prisma.notification.findMany({
            orderBy: {
                createAt: 'asc'
            },
            where: {
                userId
            },
            include: {
                userReference: {
                    select: {
                        email: true,
                        username: true,
                        name: true,
                        lastname: true,
                        last_session: true,
                        rol: true
                    }
                }
            },
            skip: pag*limit,
            take: limit,
        });
        return entity;
    }

    public async read({id}: {id:number}) {
        const entity = this.prisma.notification.update({
            data: { read:true },
            where: { id }
        })
        return entity;
    }
}
