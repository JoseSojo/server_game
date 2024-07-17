import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Request as RequestType, Response } from 'express';
export declare class AuthController {
    private prisma;
    private userService;
    private trans;
    private authService;
    constructor(prisma: PrismaService, userService: UserService, trans: TranslateService, authService: AuthService);
    login(data: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: RequestType): Promise<false | ({
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
    })>;
}
