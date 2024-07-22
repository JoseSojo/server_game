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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const translate_service_1 = require("../translate/translate.service");
const user_service_1 = require("./user.service");
const create_dto_1 = require("./dto/create.dto");
const auth_guard_1 = require("../auth/guard/auth.guard");
const notification_service_1 = require("../notification/notification.service");
let UserController = class UserController {
    constructor(trans, service, notification) {
        this.trans = trans;
        this.service = service;
        this.notification = notification;
    }
    async create(data) {
        const hashPromise = this.service.HashPassword({ password: data.password });
        const usernameFound = this.service.findByUsername({ username: data.username });
        const emailFound = this.service.findByEmail({ email: data.email });
        console.log(usernameFound);
        if (await usernameFound) {
            return { body: { username: data.username }, message: this.trans.translate().auth.register.danger.usernameInUser };
        }
        if (await emailFound) {
            return { body: { email: data.email }, message: this.trans.translate().auth.register.danger.emailInUser };
        }
        data.password = await hashPromise;
        const user = await this.service.create({ data });
        this.notification.create({
            data: {
                by: 'system',
                content: this.trans.translate().flash.welcome,
                type: `default`,
                userId: user.id
            }
        });
        return { body: user, message: this.trans.translate().global.success.create };
    }
    async getCoin(id, req, res) {
        const coinPromise = this.service.getCoin({ id: Number(id) });
        return { body: await coinPromise, message: this.trans.translate().global.success.default };
    }
    async incrementCoin(id, query, res) {
        const coinPromise = this.service.incrementCoint({ id: Number(id), coin: query.coin ? Number(query.coin) : undefined });
        return { body: await coinPromise, message: this.trans.translate().global.success.default };
    }
    async decrementCoin(id, query, res) {
        const coinPromise = this.service.decrementCoint({ id: Number(id), coin: query.coin ? Number(query.coin) : undefined });
        return { body: await coinPromise, message: this.trans.translate().global.success.default };
    }
    async getNotifications(id, query, res) {
        const pagPaginate = query.pag ? query.pag : 0;
        const limitPaginate = query.limit ? query.limit : 10;
        const entity = this.notification.getPaginate({ pag: Number(pagPaginate), limit: Number(limitPaginate), userId: Number(id) });
        return res
            .status(common_1.HttpStatus.OK)
            .json({ body: await entity, message: this.trans.translate().global.success });
    }
    async read(id, res) {
        const entity = this.notification.read({ id: Number(id) });
        return res
            .status(common_1.HttpStatus.OK)
            .json({ body: await entity, message: this.trans.translate().global.success });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(`/create`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(`/coin/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCoin", null);
__decorate([
    (0, common_1.Post)(`/coin/increment/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "incrementCoin", null);
__decorate([
    (0, common_1.Post)(`/coin/decrement/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "decrementCoin", null);
__decorate([
    (0, common_1.Get)(`/notification/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)(`/notification/read/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "read", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [translate_service_1.TranslateService,
        user_service_1.UserService,
        notification_service_1.NotificationService])
], UserController);
//# sourceMappingURL=user.controller.js.map