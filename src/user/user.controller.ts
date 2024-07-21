import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    Post, 
    Query, 
    Request, 
    Response, 
    UseGuards, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { TranslateService } from 'src/translate/translate.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IsAdminGuard } from 'src/auth/guard/admin.guard';
import { Response as ResponseType } from 'express';
import { NotificationService } from 'src/notification/notification.service';

@Controller('user')
export class UserController {

    constructor(
        private trans: TranslateService,
        private service: UserService,
        private notification: NotificationService
    ) {}

    @Post(`/create`)
    @UsePipes(new ValidationPipe())
    public async create(@Body() data: CreateUserDto) {
        const hashPromise = this.service.HashPassword({ password:data.password });

        const usernameFound = this.service.findByUsername({ username: data.username });
        const emailFound = this.service.findByEmail({ email: data.email });

        console.log(usernameFound);
        if(await usernameFound) {
            return { body:{ username:data.username }, message:this.trans.translate().auth.register.danger.usernameInUser }
        }

        if(await emailFound) {
            return { body:{ email:data.email }, message:this.trans.translate().auth.register.danger.emailInUser }
        }

        data.password = await hashPromise;
        const user = await this.service.create({ data });

        this.notification.create({ 
            data: {
                by: 'system',
                content: this.trans.translate().flash.welcome,
                type: `default`,
                userId: user.id
            }
        });

        return { body:user, message:this.trans.translate().global.success.create };
    }

    @Get(`/coin/:id`)
    @UseGuards(AuthGuard)
    public async getCoin(@Param(`id`) id: string, req: any, res: Response) {
        
        const coinPromise = this.service.getCoin({ id:Number(id) });
        

        return { body:await coinPromise, message:this.trans.translate().global.success.default }
    }

    @Post(`/coin/increment/:id`)
    @UseGuards(AuthGuard)
    public async incrementCoin(@Param(`id`) id: string, @Query() query: { coin?: string }, res: Response) {
        
        const coinPromise = this.service.incrementCoint({ id:Number(id), coin: query.coin ? Number(query.coin) : undefined });

        return { body:await coinPromise, message:this.trans.translate().global.success.default }
    }

    @Post(`/coin/decrement/:id`)
    @UseGuards(AuthGuard)
    public async decrementCoin(@Param(`id`) id: string, @Query() query: { coin?: string }, res: Response) {

        const coinPromise = this.service.decrementCoint({ id:Number(id), coin: query.coin ? Number(query.coin) : undefined });

        return { body:await coinPromise, message:this.trans.translate().global.success.default }
    }

    @Get(`/notification/:id`)
    public async getNotifications(@Param(`id`) id: string, @Query() query: { pag:number, limit?:number }, @Response() res: ResponseType) {

        const pagPaginate = query.pag ? query.pag : 0;
        const limitPaginate = query.limit ? query.limit : 10;

        const entity = this.notification.getPaginate({ pag:Number(pagPaginate), limit:Number(limitPaginate), userId: Number(id) });
        return res
            .status(HttpStatus.OK)
            .json({ body: await entity, message:this.trans.translate().global.success });
    }

    @Get(`/notification/read/:id`)
    public async read(@Param(`id`) id: string, @Response() res: ResponseType) {
        const entity = this.notification.read({ id: Number(id) });
        return res
            .status(HttpStatus.OK)
            .json({ body: await entity, message:this.trans.translate().global.success });
    }    

    //getCoin
}
