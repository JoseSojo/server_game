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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const translate_service_1 = require("../translate/translate.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prisma, trans) {
        this.prisma = prisma;
        this.trans = trans;
    }
    async create({ data }) {
        const entity = this.prisma.user.create({ data });
        return entity;
    }
    async findByEmail({ email }) {
        const entityPromise = this.prisma.user.findUnique({
            where: { email },
            include: {
                levelReference: true,
                profilePhotoReference: true,
                subscriptionReference: true,
                wallpaperPhotoReference: true,
                session: true
            }
        });
        return entityPromise;
    }
    async findByUsername({ username }) {
        const entityPromise = this.prisma.user.findUnique({
            where: { username },
            include: {
                levelReference: true,
                profilePhotoReference: true,
                subscriptionReference: true,
                wallpaperPhotoReference: true,
                session: true
            }
        });
        return entityPromise;
    }
    async getCoin({ id }) {
        const entity = this.prisma.user.findFirst({
            where: { id },
            select: { coin: true }
        });
        return entity;
    }
    async HashPassword({ password }) {
        const hash = await bcrypt.hash(password, 11);
        return hash;
    }
    async ComparePassword({ password, passwordDb }) {
        const compare = await bcrypt.compare(password, passwordDb);
        return compare;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        translate_service_1.TranslateService])
], UserService);
//# sourceMappingURL=user.service.js.map