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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionService = class SubscriptionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ data }) {
        const entity = this.prisma.masterSubscriptions.create({ data });
        return entity;
    }
    async findAll({ pag, limit }) {
        const entity = this.prisma.masterSubscriptions.findMany({
            skip: pag * limit,
            take: limit,
            include: {
                users: {
                    select: {
                        email: true,
                        lastname: true,
                        name: true,
                        username: true,
                        _count: true,
                        last_session: true
                    }
                }
            }
        });
        return entity;
    }
    async findOne({ id }) {
        const entity = this.prisma.masterSubscriptions.findFirst({
            where: { id },
            include: {
                users: {
                    select: {
                        email: true,
                        lastname: true,
                        name: true,
                        username: true,
                        _count: true,
                        last_session: true
                    }
                }
            }
        });
        return entity;
    }
    async update({ id, data }) {
        const entity = this.prisma.masterSubscriptions.update({
            data,
            where: { id }
        });
        return entity;
    }
    async remove(id) {
        return `This action removes a #${id} subscription`;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map