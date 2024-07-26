import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    create(createGameDto: CreateGameDto): Promise<{
        id: number;
        name: string;
        devices: string;
    }>;
    findAll(query: {
        skip?: string;
        take?: string;
    }): Promise<{
        id: number;
        name: string;
        devices: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__GameClient<{
        id: number;
        name: string;
        devices: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateGameDto: UpdateGameDto): Promise<{
        id: number;
        name: string;
        devices: string;
    }>;
}
