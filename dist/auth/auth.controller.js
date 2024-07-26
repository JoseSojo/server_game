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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const fixtures_service_1 = require("../fixtures/fixtures.service");
const game_service_1 = require("../game/game.service");
const level_service_1 = require("../level/level.service");
const subscription_service_1 = require("../subscription/subscription.service");
const login_dto_1 = require("../user/dto/login.dto");
const register_dto_1 = require("../user/dto/register.dto");
const user_service_1 = require("../user/user.service");
let AuthController = class AuthController {
    constructor(user, level, subscritions, game, fix) {
        this.user = user;
        this.level = level;
        this.subscritions = subscritions;
        this.game = game;
        this.fix = fix;
    }
    async login(query, body) {
        const foundPromise = this.user.findFirsh(body.access, query.nameGame);
        const userFound = await foundPromise;
        if (!userFound)
            return common_1.UnauthorizedException;
        const compare = this.user.Compare(body.password, userFound.userReference.password);
        if (!compare)
            return common_1.UnauthorizedException;
        const token = await this.user.HandleSession(userFound.id);
        return {
            token,
            body: userFound
        };
    }
    async register(query, body) {
        const emailPromise = this.user.findFirsh(body.email, query.nameGame);
        const userPromise = this.user.findFirsh(body.username, query.nameGame);
        if (await emailPromise)
            return false;
        if (await userPromise)
            return false;
        body.password = await this.user.Hash(body.password);
        const create = await this.user.create(body, query.nameGame);
        return { create };
    }
    async fixtures() {
        let execute = true;
        const messages = [];
        const levels = await this.level.findAll({ skip: 0, take: 1 });
        const subs = await this.subscritions.findAll({ skip: 0, take: 1 });
        const game = await this.game.findAll({ skip: 0, take: 1 });
        const user = await this.user.findTest();
        if (game.length > 0) {
            messages.push({ name: `game`, message: `creados` });
        }
        else {
            messages.push({ name: `gamex`, message: `creando` });
            await this.fix.loadGame();
        }
        if (levels.length > 0) {
            messages.push({ name: `levels`, message: `creados` });
        }
        else {
            messages.push({ name: `levels`, message: `creando` });
            await this.fix.loadLevel();
        }
        if (subs.length > 0) {
            messages.push({ name: `subs`, message: `creados` });
        }
        else {
            messages.push({ name: `subs`, message: `creando` });
            await this.fix.loadSubscription();
        }
        if (user) {
            messages.push({ name: `user`, message: `creados` });
        }
        else {
            messages.push({ name: `user`, message: `creando` });
            setTimeout(async () => {
                console.log(123);
                await this.fix.loadUser();
            }, 5000);
        }
        return { messages };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(`login`),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)(`register`),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)(`fixtures`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fixtures", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        level_service_1.LevelService,
        subscription_service_1.SubscriptionService,
        game_service_1.GameService,
        fixtures_service_1.FixturesService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map