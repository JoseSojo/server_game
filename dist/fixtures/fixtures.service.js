"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixturesService = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("../game/game.service");
const level_service_1 = require("../level/level.service");
const subscription_service_1 = require("../subscription/subscription.service");
const user_service_1 = require("../user/user.service");
let FixturesService = class FixturesService {
    constructor(level, game, subscription, user) {
        this.level = level;
        this.game = game;
        this.subscription = subscription;
        this.user = user;
    }
    async main() {
        const nameGame = await this.loadGame();
        setTimeout(() => {
            this.loadLevel();
            this.loadSubscription();
        }, 2000);
        setTimeout(() => {
            this.loadUser();
        }, 4000);
    }
    async loadLevel() {
        const datas = [
            { name: `Freyja's Fjord`, description: `Un ambiente sereno y tranquilo para una introducción suave al juego.` },
            { name: `El Cielo de Idun`, description: `Recoge los frutos de la salud y la juventud en este nivel idílico y pacífico.` },
            { name: `Odin's Trials of Wisdom`, description: `Desafíos y obstáculos que requieren estrategia y pensamiento rápido para superar.` },
            { name: `Thor's Thunderclaw`, description: `Acción rápida y emocionante con reflejos velozos requeridos para superar enemigos formidables.` },
            { name: `Loki's Labyrinth of Deception`, description: `Un laberinto lleno de secretos escondidos y sorpresas que requieren a los jugadores pensar creativamente.` },
            { name: `Fenrir's Fiery Furnace`, description: `Una batalla final intensa y emocionante contra el jefe final en un entorno infernal.` },
        ];
        datas.forEach(async (data) => {
            console.log(`creando... ${data.name}`);
            await this.level.create(data);
        });
    }
    async loadSubscription() {
        const datas = [
            { name: `JUNIOR`, description: `free incluye anuncios` },
            { name: `SENNIOR`, description: `` },
            { name: `MASTER`, description: `` },
        ];
        datas.forEach(async (data) => {
            console.log(`creando... ${data.name}`);
            await this.subscription.create(data);
        });
    }
    async loadUser() {
        const data = {
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
    async loadGame() {
        const data = { name: `GlobalGame` };
        return await this.game.create(data);
    }
};
exports.FixturesService = FixturesService;
exports.FixturesService = FixturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [level_service_1.LevelService,
        game_service_1.GameService,
        subscription_service_1.SubscriptionService,
        user_service_1.UserService])
], FixturesService);
//# sourceMappingURL=fixtures.service.js.map