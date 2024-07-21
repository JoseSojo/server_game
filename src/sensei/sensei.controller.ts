import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Request, Response, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { TranslateService } from 'src/translate/translate.service';
import { UserService } from 'src/user/user.service';
import { SenseiService } from './sensei.service';
import { PrompService } from 'src/promp/promp.service';
import { CreateSenseiDto } from './dto/create.dto';
import { Response as ResponseType } from 'express';
import { CreatePrompDto } from 'src/promp/dto/create.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Controller('sensei')
export class SenseiController {

    constructor(
        private trans: TranslateService,
        private user: UserService,
        private notification: NotificationService,
        private sensei: SenseiService,
        private promp: PrompService,
        private http: HttpService,
    ) {}

    @Post(``)
    @UsePipes(new ValidationPipe())
    public async create(@Body() data: any, @Response() res: ResponseType) {
        const entityUser = this.user.validateSenseisByUser({ id:Number(data.userId) });

        data.userId = Number(data.userId);
        const str = data.name;

        data.name = `${str[0].toUpperCase()}${str.slice(1)}`;

        if((await entityUser) === false) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: this.trans.translate().global.danger.limit, body: await entityUser }); 
        }

        const noRepeat = this.sensei.findForValidate({ id:data.userId, name:data.name });
        if(await noRepeat) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: this.trans.translate().global.danger.added, body: await noRepeat });  
        }


        

        const entity = this.sensei.create({ data });
        await this.notification.create({ data:{ by:'system', content:`Sensei creado`, type:`default`, userId:data.userId } });

        return res
            .status(HttpStatus.OK)
            .json({ message: this.trans.translate().global.success.create, body: await entity });
   }

    @Put(`/update/:id`)
    @UsePipes(new ValidationPipe())
    public async update(@Body() data: CreateSenseiDto, @Param(`id`) id: string, @Response() res: ResponseType) {
        data.userId = Number(data.userId);
        const str = data.name;
        data.name = `${str[0].toUpperCase()}${str.slice(1)}`;
        const idParse = Number(id);
        const entity = this.sensei.update({ data, id:idParse });

        await this.notification.create({ data:{ by:'system', content:`Sensei actualizado`, type:`default`, userId:data.userId } });

        return res
            .status(HttpStatus.OK)
            .json({ message: this.trans.translate().global.success.update, body: await entity });
    }

    @Post(`promp`)
    @UsePipes(new ValidationPipe())
    public async prompCreate(@Body() data: CreatePrompDto, @Response() res: ResponseType) {
        // const entity = this.promp.create({ data });

        this.sensei.getBitcoinPriceUSD();

        return res
            .status(HttpStatus.OK)
            .json({ message: this.trans.translate().global.success.create, body: [] });
    }

    // get senseis by user
    @Get(`:id`)
    public async getSenseis(@Param(`id`) id: string, @Query() query:{pag?:string,limit?:string} ,@Response() res: ResponseType) {
        const idParse = Number(id);
        const pagParse = query.pag ? Number(query.pag) : 0;
        const limitParse = query.limit ? Number(query.limit) : 5;
        const entity = this.sensei.getSenseisByUser({ id:idParse, limit: limitParse, pag: pagParse });

        const trans = this.trans.translate();
        return res
            .status(HttpStatus.OK)
            .json({ message:trans.global.success.default, body:await entity });
    }

}
