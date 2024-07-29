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
const prisma_service_1 = require("../global/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../global/constant");
let UserService = class UserService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async findFirsh(param, nameGame) {
        return this.prisma.dataUserGame.findFirst({
            where: {
                userReference: { OR: [{ email: param }, { username: param }] },
                dameReference: { name: nameGame }
            },
            include: {
                dameReference: true,
                userReference: true,
                levelReference: true,
                subscriptionReference: true,
                profilePhotoReference: true
            }
        });
    }
    async findTest() {
        return this.prisma.user.findFirst();
    }
    async create(data, nameGame) {
        const levelPromise = this.prisma.masterLevels.findFirst({ orderBy: { id: 'asc' } });
        const gamePromise = this.prisma.game.findFirst({ where: { name: nameGame } });
        const subscriptionPromise = this.prisma.masterSubscriptions.findFirst({ orderBy: { id: 'asc' } });
        const createPromise = this.prisma.user.create({ data });
        const level = await levelPromise;
        const game = await gamePromise;
        const subscription = await subscriptionPromise;
        const user = await createPromise;
        return this.prisma.dataUserGame.create({
            data: {
                coin: 5,
                userReference: { connect: { id: user.id } },
                levelReference: { connect: { id: level.id } },
                dameReference: { connect: { id: game.id } },
                subscriptionReference: { connect: { id: subscription.id } },
                profilePhotoReference: { create: {} }
            }
        });
    }
    async Hash(password) {
        return bcrypt.hash(password, 11);
    }
    async Compare(password, passwordHash) {
        return await bcrypt.compare(password, passwordHash);
    }
    async HandleSession(id) {
        const date = new Date();
        const token = await this.jwt.signAsync(id.toString(), { secret: constant_1.jwtConstants.secret });
        return await this.prisma.session.create({
            data: {
                startSession: date,
                token,
                dataId: id,
            }
        });
    }
    async findSessionByToken(token) {
        const session = await this.prisma.session.findFirst({
            where: { token },
            include: {
                userReference: {
                    include: {
                        dameReference: true,
                        levelReference: true,
                        profilePhotoReference: true,
                        subscriptionReference: true,
                        userReference: true
                    }
                }
            }
        });
        return { token: session.token, data: session.userReference };
    }
    async CreateJWT(id) {
        return;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map