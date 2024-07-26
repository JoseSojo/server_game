import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Query, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private SubscriptionService: SubscriptionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.SubscriptionService.create(createSubscriptionDto);
  }

  @Get()
  public async findAll(@Query() query: { skip?:string,take?:string }) {
    return await this.SubscriptionService.findAll({ skip:query.skip? Number(query.skip) : 0, take: query.take? Number(query.take) : 10 });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.SubscriptionService.findOne(Number(id));
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.SubscriptionService.update(Number(id), updateSubscriptionDto);
  }
}
