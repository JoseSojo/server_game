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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../constant");
const prisma_service_1 = require("../prisma/prisma.service");
const translate_service_1 = require("../translate/translate.service");
let AuthService = class AuthService {
    constructor(prisma, trans, jwt) {
        this.prisma = prisma;
        this.trans = trans;
        this.jwt = jwt;
    }
    async generateLogin({ id }) {
        const payload = { id };
        const token = this.jwt.signAsync(payload, { secret: constant_1.jwtConstants.secret });
        const date = new Date();
        await this.prisma.session.create({
            data: {
                startSession: date,
                token: await token,
                userId: id
            }
        });
        return token;
    }
    async logout({ id }) {
        const date = new Date();
        const session = await this.prisma.session.update({
            data: { endSession: date, token: `` },
            where: { id }
        });
        await this.prisma.user.update({
            data: { last_session: date },
            where: { id: session.userId }
        });
        return true;
    }
    async findSessionByToken({ token }) {
        const entity = this.prisma.session.findFirst({
            where: {
                AND: {
                    token,
                    endSession: null,
                }
            },
            include: {
                userReference: true,
            }
        });
        return entity;
    }
    async findSessionByUserId({ id }) {
        const entity = this.prisma.session.findFirst({
            where: {
                AND: {
                    userId: id,
                    endSession: null
                }
            }
        });
        return entity;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        translate_service_1.TranslateService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map