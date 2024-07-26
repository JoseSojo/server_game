import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma.service';
import * as bcrypt from 'bcrypt';
import {  } from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/global/constant';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    public async findFirsh(param: string, nameGame:string) {
        return this.prisma.dataUserGame.findFirst({
            where: {
                userReference: { OR:[{ email:param }, { username: param }] },
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

    public async findTest() {
        return this.prisma.user.findFirst();
    }

    public async create(data: RegisterDto, nameGame:string) {
        const levelPromise = this.prisma.masterLevels.findFirst({ orderBy:{id:'asc'} });
        const gamePromise = this.prisma.game.findFirst({ where:{name:nameGame} });
        const subscriptionPromise = this.prisma.masterSubscriptions.findFirst({ orderBy:{id:'asc'} });

        const createPromise = this.prisma.user.create({ data });
        
        const level = await levelPromise;
        const game = await gamePromise;
        const subscription = await subscriptionPromise;

        const user = await createPromise;

        return this.prisma.dataUserGame.create({
            data: {
                coin: 5,
                userReference: { connect: { id:user.id }},
                // level
                levelReference: {connect:{id:level.id}},
                // game
                dameReference: {connect:{id:game.id}},
                // subs
                subscriptionReference: {connect:{id:subscription.id}},
                profilePhotoReference: { create:{} }
            }
        })
    }

    public async Hash(password: string) {
        return bcrypt.hash(password, 11);
    }

    public async Compare(password: string, passwordHash: string) {
        return await bcrypt.compare(password, passwordHash);
    }

    public async HandleSession(id: number) {
        const date = new Date();
        const token = await this.jwt.signAsync(id.toString(), { secret: jwtConstants.secret });
        return await this.prisma.session.create({
            data: {
                startSession: date,
                token,
                dataId: id,
            }   
        });
    }

    public async findSessionByToken(token: string) {
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

        return { token:session.token, data: session.userReference };
    }

    public async CreateJWT(id: number) {
        return 
    }
}
