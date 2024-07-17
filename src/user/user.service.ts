import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { CreateUserDto } from './dto/create.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserCompelted } from 'src/types/user.d';

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

    public async HashPassword({ password }: { password:string }) {
        const hash = await bcrypt.hash(password, 11);
        return hash;
    }

    public async ComparePassword({ password, passwordDb }: { password:string, passwordDb:string }) {
        const compare = await bcrypt.compare(password, passwordDb);
        return compare;
    }

}
