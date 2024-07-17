import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PrismaService, TranslateService],
})
export class SubscriptionModule {}
