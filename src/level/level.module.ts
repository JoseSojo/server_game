import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
    controllers: [LevelController],
    providers: [LevelService, PrismaService, TranslateService, AuthService]
})
export class LevelModule {
    
}
