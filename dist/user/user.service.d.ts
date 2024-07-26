import { PrismaService } from 'src/global/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    findFirsh(param: string, nameGame: string): Promise<{
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
        };
        dameReference: {
            id: number;
            name: string;
            devices: string;
        };
        subscriptionReference: {
            id: number;
            name: string;
            description: string;
        };
        levelReference: {
            id: number;
            name: string;
            description: string;
        };
        profilePhotoReference: {
            id: number;
            publicId: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
    } & {
        id: number;
        coin: number;
        languaje: string;
        userId: number;
        GameId: number;
        subscriptionId: number | null;
        levelId: number | null;
        profilePhotoId: number | null;
    }>;
    findTest(): Promise<{
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
    }>;
    create(data: RegisterDto, nameGame: string): Promise<{
        id: number;
        coin: number;
        languaje: string;
        userId: number;
        GameId: number;
        subscriptionId: number | null;
        levelId: number | null;
        profilePhotoId: number | null;
    }>;
    Hash(password: string): Promise<string>;
    Compare(password: string, passwordHash: string): Promise<boolean>;
    HandleSession(id: number): Promise<{
        id: number;
        startSession: Date;
        endSession: Date | null;
        token: string;
        dataId: number;
    }>;
    CreateJWT(id: number): Promise<void>;
}
