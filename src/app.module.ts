import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { TranslateService } from './translate/translate.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { LevelService } from './level/level.service';
import { LevelController } from './level/level.controller';
import { LevelModule } from './level/level.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionService } from './subscription/subscription.service';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [AuthModule, UserModule, LevelModule, SubscriptionModule, NotificationModule],
  controllers: [AppController, AuthController, UserController, LevelController],
  providers: [
    AppService,
    PrismaService, TranslateService, 
    UserService, JwtService, AuthService, 
    LevelService, SubscriptionService,
    NotificationService
  ],
})
export class AppModule {}
