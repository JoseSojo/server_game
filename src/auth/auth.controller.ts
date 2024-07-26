import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { Request as RequestType, Response } from 'express';
import { CreateUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private prisma: PrismaService,
        private userService: UserService, 
        private trans: TranslateService,
        private authService: AuthService,

    ) {}

    @Post(`/login`)
    @UsePipes(new ValidationPipe())
    public async login(@Body() data: LoginUserDto, @Res() res: Response) {

        const user = await this.userService.findByEmail({ email:data.email });

        if(!user) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ body: data, message: this.trans.translate().auth.login.danger.emailNotFound });
        }

        const compare = await this.userService.ComparePassword({ password:data.password, passwordDb:user.password });
        if(!compare) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ body: data, message: this.trans.translate().auth.login.danger.passwordCompare });
        }

        const session = await this.authService.findSessionByUserId({ id:user.id });
        if(session) {
            this.authService.logout({ id:session.id });
        }

        const token = this.authService.generateLogin({ id:user.id });

        return res
            .status(HttpStatus.OK)
            .json({ body:user, token: await token, message: this.trans.translate().auth.login.success.default });
    }

    @Post(`/register`)
    @UsePipes(new ValidationPipe())
    public async register(@Body() data: CreateUserDto, @Res() res: Response) {
        const email = await this.userService.findByEmail({ email:data.email });
        const username = await this.userService.findByUsername({ username:data.username });

        if(!email) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ body: data, message: this.trans.translate().auth.register.danger.emailInUser });
        }

        if(!username) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ body: data, message: this.trans.translate().auth.register.danger.usernameInUser });
        }

        const user = await this.userService.create({ data });
        const token = this.authService.generateLogin({ id:user.id });

        return res
            .status(HttpStatus.OK)
            .json({ body:user, token: await token, message: this.trans.translate().global.success.create });
    }

    @Get(`/logout`)
    @HttpCode(200)
    public async logout(@Request() req: RequestType) {
        const token = req.headers.token as string;
        const session = await this.authService.findSessionByToken({ token }); 
        if(!session) {
            return false;
        }
        await this.authService.logout({ id:session.id });
        return session;
    }

}
