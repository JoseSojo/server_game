import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { CreateUserDto } from './dto/create.dto';
import { Prisma } from '@prisma/client';
export declare class UserService {
    private prisma;
    private trans;
    constructor(prisma: PrismaService, trans: TranslateService);
    create({ data }: {
        data: CreateUserDto;
    }): Promise<{
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
    }>;
    validateSenseisByUser({ id }: {
        id: number;
    }): Promise<boolean>;
    findUserById({ id }: {
        id: number;
    }): Promise<{
        _count: {
            profilePhotoReference: number;
            wallpaperPhotoReference: number;
            subscriptionReference: number;
            levelReference: number;
            session: number;
            notifications: number;
            senseis: number;
        };
        profilePhotoReference: {
            id: number;
            uuid: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
        wallpaperPhotoReference: {
            id: number;
            uuid: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
        subscriptionReference: {
            id: number;
            name: string;
            description: string;
            limitSensei: number;
        };
        levelReference: {
            id: number;
            name: string;
            description: string;
        };
        session: {
            id: number;
            startSession: Date;
            endSession: Date | null;
            token: string;
            userId: number;
        }[];
    } & {
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
    }>;
    findByEmail({ email }: {
        email: string;
    }): Promise<{
        profilePhotoReference: {
            id: number;
            uuid: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
        wallpaperPhotoReference: {
            id: number;
            uuid: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
        subscriptionReference: {
            id: number;
            name: string;
            description: string;
            limitSensei: number;
        };
        levelReference: {
            id: number;
            name: string;
            description: string;
        };
        session: {
            id: number;
            startSession: Date;
            endSession: Date | null;
            token: string;
            userId: number;
        }[];
    } & {
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
    }>;
    findByUsername({ username }: {
        username: string;
    }): Promise<{
        profilePhotoReference: {
            id: number;
            uuid: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
        wallpaperPhotoReference: {
            id: number;
            uuid: string;
            documentPath: string;
            documentDownload: string;
            type: string;
            use: string;
        };
        subscriptionReference: {
            id: number;
            name: string;
            description: string;
            limitSensei: number;
        };
        levelReference: {
            id: number;
            name: string;
            description: string;
        };
        session: {
            id: number;
            startSession: Date;
            endSession: Date | null;
            token: string;
            userId: number;
        }[];
    } & {
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
    }>;
    getCoin({ id }: {
        id: number;
    }): Promise<{
        coin: number;
    }>;
    incrementCoint({ coin, id }: {
        coin?: number;
        id: number;
    }): Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    decrementCoint({ coin, id }: {
        coin?: number;
        id: number;
    }): Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    HashPassword({ password }: {
        password: string;
    }): Promise<string>;
    ComparePassword({ password, passwordDb }: {
        password: string;
        passwordDb: string;
    }): Promise<boolean>;
}
