import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from 'src/constant';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, TranslateService]
})
export class AuthModule {}
