import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslateService {

    private payload: string;
    private payloadList: string[];

    constructor() {
        this.payload = `es`;
        this.payloadList = [`es`]; 
    }

    public getPayload() {
        return this.payload;
    }

    public setPayload({ payload }: { payload: string }) {
        this.payload = payload;
        return;
    }

    public getPayloadList() {
        return this.payloadList;
    }

    public translate() {
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
                welcome:`Bienvenido`,
                accountCreate: `Cuenta creada`
            }
        }

        const en = {};

        if(payload == `es`) return es;
        // else if(payload == `en`) return en;
        return es;
    }

}
