import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll(@Query() query: { skip?:string,take?:string }) {
    return this.gameService.findAll({ skip:query.skip? Number(query.skip) : 0, take: query.take? Number(query.take) : 10 });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(Number(id), updateGameDto);
  }

}
