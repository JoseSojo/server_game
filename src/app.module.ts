import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PrismaService } from './global/prisma.service';
import { LevelModule } from './level/level.module';
import { GameController } from './game/game.controller';
import { LevelController } from './level/level.controller';
import { GameService } from './game/game.service';
import { LevelService } from './level/level.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { FixturesService } from './fixtures/fixtures.service';
import { SubscriptionService } from './subscription/subscription.service';

@Module({
  imports: [ GameModule, LevelModule, UserModule ],
  controllers: [ GameController, LevelController, AuthController ],
  providers: [ GameService, LevelService, PrismaService, JwtService, UserService, FixturesService, SubscriptionService ],
})
export class AppModule {}
