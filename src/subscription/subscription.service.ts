import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create.dto';
import { UpdateSubscriptionDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionService {

  constructor(
    private prisma: PrismaService,
  ) {}

  public async create({data}: {data: CreateSubscriptionDto}) {
    const entity = this.prisma.masterSubscriptions.create({ data });
    return entity;
  }

  public async findAll({ pag, limit }: { pag:number, limit: number }) {
    const entity = this.prisma.masterSubscriptions.findMany({
      skip: pag*limit,
      take: limit,
      include: {
        users: {
          select: {
            email: true,
            lastname: true,
            name: true,
            username: true,
            _count: true,
            last_session: true
          }
        }
      }
    })

    return entity;
  }

  public async findOne({id}: {id: number}) {
    const entity = this.prisma.masterSubscriptions.findFirst({
      where: {id},
      include: {
        users: {
          select: {
            email: true,
            lastname: true,
            name: true,
            username: true,
            _count: true,
            last_session: true
          }
        }
      }
    })

    return entity;
  }

  public async update({id, data}: {id: number, data: UpdateSubscriptionDto}) {
    const entity = this.prisma.masterSubscriptions.update({
      data,
      where: { id }
    });

    return entity;
  }

  public async remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
