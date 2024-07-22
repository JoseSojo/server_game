import { HttpStatus, Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { SenseiService } from 'src/sensei/sensei.service';
import { PrompService } from 'src/promp/promp.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ChatController],
  providers: [UserService, PrismaService, TranslateService, SenseiService, PrompService, AuthService]
})
export class ChatModule {}
