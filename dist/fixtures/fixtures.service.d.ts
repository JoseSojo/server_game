import { GameService } from 'src/game/game.service';
import { LevelService } from 'src/level/level.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { UserService } from 'src/user/user.service';
export declare class FixturesService {
    private level;
    private game;
    private subscription;
    private user;
    constructor(level: LevelService, game: GameService, subscription: SubscriptionService, user: UserService);
    main(): Promise<void>;
    loadLevel(): Promise<void>;
    loadSubscription(): Promise<void>;
    loadUser(): Promise<void>;
    loadGame(): Promise<{
        id: number;
        name: string;
        devices: string;
    }>;
}
