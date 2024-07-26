import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/global/prisma.service';

@Injectable()
export class SubscriptionService {

  constructor(
    private prisma: PrismaService
  ) {}

  public async create(data: CreateSubscriptionDto) {
    return this.prisma.masterSubscriptions.create({ data });
  }

  public async findAll({ skip, take, options }: { skip:number, take:number, options?:any }) {
    return this.prisma.masterSubscriptions.findMany({ skip, take });
  }

  public findOne(id: number) {
    return this.prisma.masterSubscriptions.findFirst({ where:{id} });
  }

  public async update(id: number, data: UpdateSubscriptionDto) {
    return this.prisma.masterSubscriptions.update({ data, where:{id} });
  }

  public async remove(id: number) {
    return id;
  }
}
