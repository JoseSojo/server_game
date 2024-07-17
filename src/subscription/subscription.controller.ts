import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Response, HttpStatus } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create.dto';
import { UpdateSubscriptionDto } from './dto/update.dto';
import { Response as ResponseType } from 'express';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async  create(@Body() createSubscriptionDto: CreateSubscriptionDto, @Response() res: ResponseType) {


    const entity = this.subscriptionService.create({ data:createSubscriptionDto });
    return res
      .status(HttpStatus.CREATED)
      .json({ body:await entity });
  }

  @Get()
  public async findAll(@Query() query: any, @Response() res: ResponseType) {

    const pag = query.pag ? parseInt(query.pag) : 0;
    const limit = query.limit ? parseInt(query.limit) : 0;

    const entity = this.subscriptionService.findAll({ pag, limit });

    return res
      .status(HttpStatus.OK)
      .json({ body:await entity });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string, @Response() res: ResponseType) {
    const entity = this.subscriptionService.findOne({ id: Number(id)});
    
    return res
      .status(HttpStatus.OK)
      .json({ body: await entity });
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto, @Response() res: ResponseType) {

    const entity = this.subscriptionService.update({ id: Number(id), data:updateSubscriptionDto });

    return res
      .status(HttpStatus.OK)
      .json({ body:  await entity });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subscriptionService.remove(+id);
  // }
}
