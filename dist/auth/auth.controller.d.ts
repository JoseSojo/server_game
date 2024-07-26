import { UnauthorizedException } from '@nestjs/common';
import { FixturesService } from 'src/fixtures/fixtures.service';
import { GameService } from 'src/game/game.service';
import { LevelService } from 'src/level/level.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private user;
    private level;
    private subscritions;
    private game;
    private fix;
    constructor(user: UserService, level: LevelService, subscritions: SubscriptionService, game: GameService, fix: FixturesService);
    login(query: {
        nameGame: string;
    }, body: LoginDto): Promise<typeof UnauthorizedException | {
        token: {
            id: number;
            startSession: Date;
            endSession: Date | null;
            token: string;
            dataId: number;
        };
        body: {
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
        };
    }>;
    register(query: {
        nameGame: string;
    }, body: RegisterDto): Promise<false | {
        create: {
            id: number;
            coin: number;
            languaje: string;
            userId: number;
            GameId: number;
            subscriptionId: number | null;
            levelId: number | null;
            profilePhotoId: number | null;
        };
    }>;
    fixtures(): Promise<{
        messages: any[];
    }>;
}
