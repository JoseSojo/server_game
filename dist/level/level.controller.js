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
exports.LevelController = void 0;
const common_1 = require("@nestjs/common");
const level_service_1 = require("./level.service");
const create_level_dto_1 = require("./dto/create-level.dto");
const update_level_dto_1 = require("./dto/update-level.dto");
let LevelController = class LevelController {
    constructor(levelService) {
        this.levelService = levelService;
    }
    async create(createLevelDto) {
        return await this.levelService.create(createLevelDto);
    }
    async findAll(query) {
        return await this.levelService.findAll({ skip: query.skip ? Number(query.skip) : 0, take: query.take ? Number(query.take) : 10 });
    }
    async findOne(id) {
        return await this.levelService.findOne(Number(id));
    }
    async update(id, updateLevelDto) {
        return await this.levelService.update(Number(id), updateLevelDto);
    }
};
exports.LevelController = LevelController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_level_dto_1.CreateLevelDto]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_level_dto_1.UpdateLevelDto]),
    __metadata("design:returntype", Promise)
], LevelController.prototype, "update", null);
exports.LevelController = LevelController = __decorate([
    (0, common_1.Controller)('level'),
    __metadata("design:paramtypes", [level_service_1.LevelService])
], LevelController);
//# sourceMappingURL=level.controller.js.map