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
exports.SenseiController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../notification/notification.service");
const translate_service_1 = require("../translate/translate.service");
const user_service_1 = require("../user/user.service");
const sensei_service_1 = require("./sensei.service");
const promp_service_1 = require("../promp/promp.service");
const create_dto_1 = require("./dto/create.dto");
const create_dto_2 = require("../promp/dto/create.dto");
const axios_1 = require("@nestjs/axios");
let SenseiController = class SenseiController {
    constructor(trans, user, notification, sensei, promp, http) {
        this.trans = trans;
        this.user = user;
        this.notification = notification;
        this.sensei = sensei;
        this.promp = promp;
        this.http = http;
    }
    async create(data, res) {
        const entityUser = this.user.validateSenseisByUser({ id: Number(data.userId) });
        data.userId = Number(data.userId);
        const str = data.name;
        data.name = `${str[0].toUpperCase()}${str.slice(1)}`;
        if ((await entityUser) === false) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: this.trans.translate().global.danger.limit, body: await entityUser });
        }
        const noRepeat = this.sensei.findForValidate({ id: data.userId, name: data.name });
        if (await noRepeat) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: this.trans.translate().global.danger.added, body: await noRepeat });
        }
        const entity = this.sensei.create({ data });
        await this.notification.create({ data: { by: 'system', content: `Sensei creado`, type: `default`, userId: data.userId } });
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: this.trans.translate().global.success.create, body: await entity });
    }
    async update(data, id, res) {
        data.userId = Number(data.userId);
        const str = data.name;
        data.name = `${str[0].toUpperCase()}${str.slice(1)}`;
        const idParse = Number(id);
        const entity = this.sensei.update({ data, id: idParse });
        await this.notification.create({ data: { by: 'system', content: `Sensei actualizado`, type: `default`, userId: data.userId } });
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: this.trans.translate().global.success.update, body: await entity });
    }
    async prompCreate(data, res) {
        this.sensei.getBitcoinPriceUSD();
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: this.trans.translate().global.success.create, body: [] });
    }
    async getSenseis(id, query, res) {
        const idParse = Number(id);
        const pagParse = query.pag ? Number(query.pag) : 0;
        const limitParse = query.limit ? Number(query.limit) : 5;
        const entity = this.sensei.getSenseisByUser({ id: idParse, limit: limitParse, pag: pagParse });
        const trans = this.trans.translate();
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: trans.global.success.default, body: await entity });
    }
};
exports.SenseiController = SenseiController;
__decorate([
    (0, common_1.Post)(``),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SenseiController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(`/update/:id`),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)(`id`)),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateSenseiDto, String, Object]),
    __metadata("design:returntype", Promise)
], SenseiController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(`promp`),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_2.CreatePrompDto, Object]),
    __metadata("design:returntype", Promise)
], SenseiController.prototype, "prompCreate", null);
__decorate([
    (0, common_1.Get)(`:id`),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SenseiController.prototype, "getSenseis", null);
exports.SenseiController = SenseiController = __decorate([
    (0, common_1.Controller)('sensei'),
    __metadata("design:paramtypes", [translate_service_1.TranslateService,
        user_service_1.UserService,
        notification_service_1.NotificationService,
        sensei_service_1.SenseiService,
        promp_service_1.PrompService,
        axios_1.HttpService])
], SenseiController);
//# sourceMappingURL=sensei.controller.js.map