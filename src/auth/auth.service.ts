import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService, 
        private trans: TranslateService,
        private jwt: JwtService
    ) {}

    public async generateLogin({ id }: { id:number }) {

        const payload = { id };
        const token = this.jwt.signAsync(payload, { secret: jwtConstants.secret });

        const date = new Date();
        await this.prisma.session.create({
            data: {
                startSession: date,
                token: await token,
                userId: id
            }
        });

        return token;
    }

    public async logout({ id }: { id:number }) {
        const date = new Date();
        const session = await this.prisma.session.update({
            data: { endSession:date, token: `` },
            where: { id }
        });
        await this.prisma.user.update({
            data: { last_session: date },
            where: { id:session.userId }
        });
        
        return true;
    }

    public async findSessionByToken({token}: {token:string}) {
        const entity = this.prisma.session.findFirst({
            where: {
                AND: {
                    token,
                    endSession: null,
                }
            },
            include: {
                userReference: true,
            }
        });
        return entity;
    }

    public async findSessionByUserId({ id }: {id: number}) {
        const entity = this.prisma.session.findFirst({
            where: {
                AND: {
                    userId: id,
                    endSession: null
                }
            }
        });
        return entity;
    }

}
