import { Response as ResponseType } from 'express';
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
    }, body: LoginDto, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
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
