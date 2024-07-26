import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/global/prisma.service';

@Injectable()
export class LevelService {

  constructor(
    private prisma: PrismaService
  ) {}

  public async create(data: CreateLevelDto) {
    return this.prisma.masterLevels.create({ data });
  }

  public async findAll({ skip, take, options }: { skip:number, take:number, options?:any }) {
    return this.prisma.masterLevels.findMany({ skip, take });
  }

  public findOne(id: number) {
    return this.prisma.masterLevels.findFirst({ where:{id} });
  }

  public async update(id: number, data: UpdateLevelDto) {
    return this.prisma.masterLevels.update({ data, where:{id} });
  }

  public async remove(id: number) {
    return id;
  }
}
