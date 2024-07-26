import { Body, Controller, HttpCode, Post, Query, Response, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { FixturesService } from 'src/fixtures/fixtures.service';
import { GameService } from 'src/game/game.service';
import { LevelService } from 'src/level/level.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private user: UserService,
        private level: LevelService,
        private subscritions: SubscriptionService,
        private game: GameService,
        private fix: FixturesService
    ) {}

    @Post(`login`)
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    public async login(@Query() query: {nameGame:string} ,@Body() body: LoginDto, @Response() res: ResponseType) {
        const foundPromise = this.user.findFirsh(body.access, query.nameGame);
        
        const userFound = await foundPromise;
        if(!userFound) return res.status(401).json({ message:`verify data access` });;

        const compare = await this.user.Compare(body.password, userFound.userReference.password);
        if(!compare) return res.status(401).json({ message:`verify data segurity` });

        // handle session access token
        const token = await this.user.HandleSession(userFound.id);

        return res
            .status(200)
                .json({
                token,
                body: userFound
            })
    }

    @Post(`register`)
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    public async register(@Query() query: {nameGame:string}, @Body() body: RegisterDto) {
        const emailPromise = this.user.findFirsh(body.email, query.nameGame);
        const userPromise = this.user.findFirsh(body.username, query.nameGame);

        if(await emailPromise) return false; // correo en uso en un juego
        if(await userPromise) return false;  // usuario en uso en un juego

        body.password = await this.user.Hash(body.password);
        const create = await this.user.create(body, query.nameGame);
        
        return { create };
    }

    @Post(`fixtures`)
    public async fixtures() {
        let execute = true;
        const messages: any[] = [];

        const levels = await this.level.findAll({ skip:0,take:1 });
        const subs = await this.subscritions.findAll({ skip:0,take:1 });
        const game = await this.game.findAll({ skip:0,take:1 });
        const user = await this.user.findTest();

        if(game.length > 0) {
            messages.push({name:`game`, message:`creados`});
        } else {
            messages.push({name:`gamex`, message:`creando`});
            await this.fix.loadGame();
        }

        if(levels.length > 0) {
            messages.push({name:`levels`, message:`creados`});
        } else {
            messages.push({name:`levels`, message:`creando`});
            await this.fix.loadLevel();
        }

        if(subs.length > 0) {
            messages.push({name:`subs`, message:`creados`});
        } else {
            messages.push({name:`subs`, message:`creando`});
            await this.fix.loadSubscription();
        }

        if(user) {
            messages.push({name:`user`, message:`creados`});
        } else {
            messages.push({name:`user`, message:`creando`});
            setTimeout(async ()=> {
                console.log(123);
                await this.fix.loadUser()
            }, 5000);
        }

        return {messages};
    }

}
