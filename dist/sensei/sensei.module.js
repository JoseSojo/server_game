"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenseiModule = void 0;
const common_1 = require("@nestjs/common");
const promp_service_1 = require("../promp/promp.service");
const translate_service_1 = require("../translate/translate.service");
const sensei_service_1 = require("./sensei.service");
const prisma_service_1 = require("../prisma/prisma.service");
const sensei_controller_1 = require("./sensei.controller");
const user_service_1 = require("../user/user.service");
const notification_service_1 = require("../notification/notification.service");
const axios_1 = require("@nestjs/axios");
let SenseiModule = class SenseiModule {
};
exports.SenseiModule = SenseiModule;
exports.SenseiModule = SenseiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule
        ],
        providers: [
            promp_service_1.PrompService,
            translate_service_1.TranslateService,
            sensei_service_1.SenseiService,
            prisma_service_1.PrismaService,
            user_service_1.UserService,
            notification_service_1.NotificationService
        ],
        controllers: [sensei_controller_1.SenseiController]
    })
], SenseiModule);
//# sourceMappingURL=sensei.module.js.map