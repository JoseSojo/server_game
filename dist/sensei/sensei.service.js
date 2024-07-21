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
exports.SenseiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const promp_service_1 = require("../promp/promp.service");
const axios_1 = require("@nestjs/axios");
let SenseiService = class SenseiService {
    constructor(prisma, promp, http) {
        this.prisma = prisma;
        this.promp = promp;
        this.http = http;
    }
    async create({ data }) {
        const entity = this.prisma.sensei.create({ data });
        return entity;
    }
    async update({ data, id }) {
        const entity = this.prisma.sensei.update({ data, where: { id } });
        return entity;
    }
    async findForValidate({ id, name }) {
        const entity = this.prisma.sensei.findFirst({
            where: {
                userId: id,
                name: name,
            }
        });
        return entity;
    }
    async getSenseisByUser({ id, pag, limit }) {
        const entity = this.prisma.sensei.findMany({
            include: {
                _count: {
                    select: {
                        propmsQuery: true,
                    }
                }
            },
            skip: pag * limit,
            take: limit,
            where: {
                userId: id,
            }
        });
        return entity;
    }
    async getBitcoinPriceUSD() {
        const API_KEY = `c15a22e4-df48-4a51-840f-5033321d428c`;
        const url = `https://api.deep.ai/v1/Q&A`;
        const promp = `Simula ser especialista en matemáticas, y dama la suma de 20 + 20`;
        try {
            const response = await fetch(url, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: promp
            });
        }
        catch (error) {
            console.log(error);
        }
        console.log([]);
    }
};
exports.SenseiService = SenseiService;
exports.SenseiService = SenseiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        promp_service_1.PrompService,
        axios_1.HttpService])
], SenseiService);
//# sourceMappingURL=sensei.service.js.map