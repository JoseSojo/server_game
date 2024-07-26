import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Query, Put } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.levelService.create(createLevelDto);
  }

  @Get()
  public async findAll(@Query() query: { skip?:string,take?:string }) {
    return await this.levelService.findAll({ skip:query.skip? Number(query.skip) : 0, take: query.take? Number(query.take) : 10 });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.levelService.findOne(Number(id));
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return await this.levelService.update(Number(id), updateLevelDto);
  }
}
