import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/global/prisma.service';

@Injectable()
export class GameService {

  constructor(
    private prisma: PrismaService
  ) {}

  public async create(data: CreateGameDto) {
    return this.prisma.game.create({ data });
  }

  public async findAll({ skip, take, options }: { skip:number, take:number, options?:any }) {
    return this.prisma.game.findMany({ skip, take });
  }

  public findOne(id: number) {
    return this.prisma.game.findFirst({ where:{id} });
  }

  public async update(id: number, data: UpdateGameDto) {
    return this.prisma.game.update({ data, where:{id} });
  }

  public async remove(id: number) {
    return id;
  }
}
