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
exports.TranslateService = void 0;
const common_1 = require("@nestjs/common");
let TranslateService = class TranslateService {
    constructor() {
        this.payload = `es`;
        this.payloadList = [`es`];
    }
    getPayload() {
        return this.payload;
    }
    setPayload({ payload }) {
        this.payload = payload;
        return;
    }
    getPayloadList() {
        return this.payloadList;
    }
    translate() {
        const payload = this.getPayload();
        const es = {
            global: {
                userNotFound: `No se encontró el usuario`,
                success: {
                    default: `Operación exitosa.`,
                    create: `Creado exitoso.`,
                    update: `Actualizado exitoso.`,
                    added: `Agregado exitoso.`,
                },
                danger: {
                    default: `Error en la operación.`,
                    create: `Error al crear.`,
                    update: `Error al actualizar.`,
                    added: `Error al agregar.`,
                    limit: `Límite alcanzado.`,
                },
            },
            auth: {
                register: {
                    danger: {
                        emailInUser: `Correo electrónico en uso.`,
                        usernameInUser: `Nombre de usuario en uso.`,
                    }
                },
                login: {
                    danger: {
                        default: `Error al iniciar sesión.`,
                        emailNotFound: `Verifica el correo`,
                        passwordCompare: `Verifica tu la contraseña`,
                    },
                    success: {
                        default: `Inicio de sesión exitoso`
                    }
                }
            },
            flash: {
                welcome: `Bienvenido`,
                accountCreate: `Cuenta creada`
            }
        };
        const en = {};
        if (payload == `es`)
            return es;
        return es;
    }
};
exports.TranslateService = TranslateService;
exports.TranslateService = TranslateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TranslateService);
//# sourceMappingURL=translate.service.js.map