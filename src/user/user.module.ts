import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, TranslateService, AuthService, NotificationService]
})
export class UserModule {}
