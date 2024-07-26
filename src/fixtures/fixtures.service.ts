import { Injectable } from '@nestjs/common';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { GameService } from 'src/game/game.service';
import { CreateLevelDto } from 'src/level/dto/create-level.dto';
import { LevelService } from 'src/level/level.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FixturesService {

    constructor(
        private level: LevelService,
        private game: GameService,
        private subscription: SubscriptionService,
        private user: UserService
    ) {}

    public async main() {
        const nameGame = await this.loadGame();

        setTimeout(() => {
            this.loadLevel();
            this.loadSubscription();
        },2000);

        setTimeout(() => {
            this.loadUser();
        },4000);
    }

    public async loadLevel() {
        const datas: CreateLevelDto[] = [
            {name:`Freyja's Fjord`, description:`Un ambiente sereno y tranquilo para una introducción suave al juego.`},
            {name: `El Cielo de Idun`, description: `Recoge los frutos de la salud y la juventud en este nivel idílico y pacífico.`},
            {name: `Odin's Trials of Wisdom`, description: `Desafíos y obstáculos que requieren estrategia y pensamiento rápido para superar.`},
            {name: `Thor's Thunderclaw`, description: `Acción rápida y emocionante con reflejos velozos requeridos para superar enemigos formidables.`},
            {name: `Loki's Labyrinth of Deception`, description: `Un laberinto lleno de secretos escondidos y sorpresas que requieren a los jugadores pensar creativamente.`},
            {name: `Fenrir's Fiery Furnace`, description: `Una batalla final intensa y emocionante contra el jefe final en un entorno infernal.`},
        ];

        datas.forEach(async (data) => {
            console.log(`creando... ${data.name}`);
            await this.level.create(data);
        });
    }

    public async loadSubscription() {
        const datas: CreateLevelDto[] = [
            {name:`JUNIOR`, description:`free incluye anuncios`},
            {name: `SENNIOR`, description: ``},
            {name: `MASTER`, description: ``},
        ];

        datas.forEach(async (data) => {
            console.log(`creando... ${data.name}`);
            await this.subscription.create(data);
        });
    }

    public async loadUser() {
        const data: RegisterDto = {
            email: `superadmin@example.com`,
            password: `admin123`,
            lastname: `Global`,
            name: `Admin`,
            username: `superadmin`,
        };

        console.log(`creando... ${data.name}`);
        data.password = await this.user.Hash(data.password);
        await this.user.create(data, `GlobalGame`);
    }

    public async loadGame() {
        const data: CreateGameDto = {name:`GlobalGame`};
        return await this.game.create(data);
    }

}
