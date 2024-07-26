import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserCompelted } from 'src/types/user.d';
import { CreateUserDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService, 
        private trans: TranslateService
    ) {}

    public async create({ data }: { data:CreateUserDto }) {
        const entity = this.prisma.user.create({ data });
        return entity;
    }

    public async validateSenseisByUser({ id }: { id:number }) {
        const user = await this.prisma.user.findFirst({
            where: { id },
            include: {
                subscriptionReference: true,
                _count: {
                    select: {
                        senseis: true
                    }
                }
            }
        });

        const limitSensei = user.subscriptionReference.limitSensei;
        const senseiUser = user._count.senseis;

        if(senseiUser+1 > limitSensei) {
            // limit alcanzado
            return false;
        }

        return true;
    }

    public async findUserById({ id }: { id:number }) {
        const entityPromise = this.prisma.user.findUnique({ 
            where: { id },
            include: {
                _count: true,
                levelReference: true,
                profilePhotoReference: true,
                subscriptionReference: true,
                wallpaperPhotoReference: true,
                session: true
            }
        });
        return entityPromise;
    }

    public async findByEmail({ email }: { email:string }) {
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

    public async findByUsername({ username }: { username:string }) {
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

    public async getCoin({id}: {id:number}) {
        const entity = this.prisma.user.findFirst({ 
            where: {id},
            select: { coin:true }
        });
        return entity;
    }

    public incrementCoint({ coin, id }: { coin?: number, id: number }) {
        const entity = this.prisma.user.update({
            where: { id },
            data: {
                coin: {
                    increment: coin ? coin : 1
                }
            }
        });
        return entity;
    }

    public decrementCoint({ coin, id }: { coin?: number, id: number }) {
        const entity = this.prisma.user.update({
            where: { id },
            data: {
                coin: {
                    decrement: coin ? coin : 1
                }
            }
        });
        return entity;
    }

    public async HashPassword({ password }: { password:string }) {
        const hash = await bcrypt.hash(password, 11);
        return hash;
    }

    public async ComparePassword({ password, passwordDb }: { password:string, passwordDb:string }) {
        const compare = await bcrypt.compare(password, passwordDb);
        return compare;
    }

}
