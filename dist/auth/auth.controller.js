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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const translate_service_1 = require("../translate/translate.service");
const login_dto_1 = require("./dto/login.dto");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(prisma, userService, trans, authService) {
        this.prisma = prisma;
        this.userService = userService;
        this.trans = trans;
        this.authService = authService;
    }
    async login(data, res) {
        const user = await this.userService.findByEmail({ email: data.email });
        if (!user) {
            return res
                .status(common_1.HttpStatus.NOT_FOUND)
                .json({ body: data, message: this.trans.translate().auth.login.danger.emailNotFound });
        }
        const compare = await this.userService.ComparePassword({ password: data.password, passwordDb: user.password });
        if (!compare) {
            return res
                .status(common_1.HttpStatus.NOT_FOUND)
                .json({ body: data, message: this.trans.translate().auth.login.danger.passwordCompare });
        }
        const session = await this.authService.findSessionByUserId({ id: user.id });
        if (session) {
            this.authService.logout({ id: session.id });
        }
        const token = this.authService.generateLogin({ id: user.id });
        return res
            .status(common_1.HttpStatus.OK)
            .json({ body: user, token: await token, message: this.trans.translate().auth.login.success.default });
    }
    async logout(req) {
        const token = req.headers.token;
        const session = await this.authService.findSessionByToken({ token });
        if (!session) {
            return false;
        }
        await this.authService.logout({ id: session.id });
        return session;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(`/login`),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(`/logout`),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        translate_service_1.TranslateService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map