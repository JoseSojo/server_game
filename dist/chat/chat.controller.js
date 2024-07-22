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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guard/auth.guard");
const promp_service_1 = require("../promp/promp.service");
const sensei_service_1 = require("../sensei/sensei.service");
const user_service_1 = require("../user/user.service");
const create_dto_1 = require("../promp/dto/create.dto");
let ChatController = class ChatController {
    constructor(promp, sensei, user) {
        this.promp = promp;
        this.sensei = sensei;
        this.user = user;
    }
    async new(body, req) {
        try {
            if (req.user.coin <= 0) {
                return { error: true, response: `No tienes coin`, body: {} };
            }
            const messagePromise = this.promp.create({ data: { message: body.message, origin: false, senseiId: Number(body.senseiId) } });
            const response = `Esta es la respuesta...`;
            const message = await messagePromise;
            const responseSave = await this.promp.create({ data: { message: response, origin: true, senseiId: Number(body.senseiId) } });
            await this.user.decrementCoint({ id: req.user.id, coin: 1 });
            return { response: responseSave, body: message, error: false };
        }
        catch (error) {
            console.log(error);
            return { error: true, response: ``, body: {} };
        }
    }
    async findAll(query) {
        try {
            const messagePromise = this.promp.findAll({ id: Number(query.id), limit: query.limit ? Number(query.limit) : 20, skip: query.skip ? Number(query.skip) : 0 });
            const messages = await messagePromise;
            return { body: messages, error: false };
        }
        catch (error) {
            console.log(error);
            return { error: true, response: ``, body: {} };
        }
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(`new`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreatePrompDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "new", null);
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findAll", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [promp_service_1.PrompService,
        sensei_service_1.SenseiService,
        user_service_1.UserService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map