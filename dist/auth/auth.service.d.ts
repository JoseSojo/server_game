import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
export declare class AuthService {
    private prisma;
    private trans;
    private jwt;
    constructor(prisma: PrismaService, trans: TranslateService, jwt: JwtService);
    generateLogin({ id }: {
        id: number;
    }): Promise<string>;
    logout({ id }: {
        id: number;
    }): Promise<boolean>;
    findSessionByToken({ token }: {
        token: string;
    }): Promise<{
        userReference: {
            id: number;
            name: string;
            lastname: string;
            password: string;
            email: string;
            username: string;
            coin: number;
            createAt: Date;
            updateAt: Date;
            last_session: Date | null;
            rol: string;
            profilePhotoId: number | null;
            wallpaperPhotoId: number | null;
            subscriptionId: number | null;
            levelId: number | null;
        };
    } & {
        id: number;
        startSession: Date;
        endSession: Date | null;
        token: string;
        userId: number;
    }>;
    findSessionByUserId({ id }: {
        id: number;
    }): Promise<{
        id: number;
        startSession: Date;
        endSession: Date | null;
        token: string;
        userId: number;
    }>;
}
