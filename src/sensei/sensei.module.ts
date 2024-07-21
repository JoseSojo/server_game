import { Module } from '@nestjs/common';
import { PrompService } from 'src/promp/promp.service';
import { TranslateService } from 'src/translate/translate.service';
import { SenseiService } from './sensei.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SenseiController } from './sensei.controller';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        PrompService, 
        TranslateService, 
        SenseiService, 
        PrismaService, 
        UserService,
        NotificationService
    ],
    controllers: [SenseiController]
})
export class SenseiModule {}
