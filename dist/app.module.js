"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const prisma_service_1 = require("./prisma/prisma.service");
const translate_service_1 = require("./translate/translate.service");
const user_module_1 = require("./user/user.module");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth/auth.service");
const subscription_module_1 = require("./subscription/subscription.module");
const level_service_1 = require("./level/level.service");
const level_controller_1 = require("./level/level.controller");
const level_module_1 = require("./level/level.module");
const notification_module_1 = require("./notification/notification.module");
const subscription_service_1 = require("./subscription/subscription.service");
const notification_service_1 = require("./notification/notification.service");
const promp_service_1 = require("./promp/promp.service");
const sensei_service_1 = require("./sensei/sensei.service");
const sensei_module_1 = require("./sensei/sensei.module");
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            level_module_1.LevelModule,
            subscription_module_1.SubscriptionModule,
            notification_module_1.NotificationModule,
            sensei_module_1.SenseiModule,
            axios_1.HttpModule
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            user_controller_1.UserController,
            level_controller_1.LevelController
        ],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            translate_service_1.TranslateService,
            user_service_1.UserService,
            jwt_1.JwtService,
            auth_service_1.AuthService,
            level_service_1.LevelService,
            subscription_service_1.SubscriptionService,
            notification_service_1.NotificationService,
            promp_service_1.PrompService,
            sensei_service_1.SenseiService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map