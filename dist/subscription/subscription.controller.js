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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
const update_subscription_dto_1 = require("./dto/update-subscription.dto");
let SubscriptionController = class SubscriptionController {
    constructor(SubscriptionService) {
        this.SubscriptionService = SubscriptionService;
    }
    async create(createSubscriptionDto) {
        return await this.SubscriptionService.create(createSubscriptionDto);
    }
    async findAll(query) {
        return await this.SubscriptionService.findAll({ skip: query.skip ? Number(query.skip) : 0, take: query.take ? Number(query.take) : 10 });
    }
    async findOne(id) {
        return await this.SubscriptionService.findOne(Number(id));
    }
    async update(id, updateSubscriptionDto) {
        return await this.SubscriptionService.update(Number(id), updateSubscriptionDto);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "update", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)('subscription'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map