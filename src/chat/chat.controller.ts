import { Body, Controller, Get, Post, Query, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PrompService } from 'src/promp/promp.service';
import { SenseiService } from 'src/sensei/sensei.service';
import { UserService } from 'src/user/user.service';
import { CreatePrompDto } from 'src/promp/dto/create.dto';

@Controller('chat')
export class ChatController {

    constructor(
        private promp: PrompService,
        private sensei: SenseiService,
        private user: UserService
    ) {}

    @Post(`new`)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    public async new(@Body() body: CreatePrompDto, @Request() req: any) {
        try {

            if(req.user.coin <= 0) {
                return { error: true, response:`No tienes coin`, body:{} }
            }

            const messagePromise = this.promp.create({ data: { message:body.message, origin:false, senseiId:Number(body.senseiId) } })
            const response = `Esta es la respuesta...` ;// petición a la IA (async)
            const message = await messagePromise;

            // crea mensaje de la respuesta
            const responseSave = await this.promp.create({data:{ message:response, origin:true,senseiId:Number(body.senseiId)}});

            await this.user.decrementCoint({ id:req.user.id, coin:1 });
            return { response:responseSave, body:message, error: false };

        } catch (error) {
            console.log(error);
            return { error: true, response:``, body:{} }
        }
    }

    @Get(``)
    @UseGuards(AuthGuard)
    public async findAll(@Query() query: { limit?: string, skip?: string, id: string }) {
        try {

            const messagePromise = this.promp.findAll({ id:Number(query.id), limit: query.limit?Number(query.limit):20, skip:query.skip?Number(query.skip):0 });
            const messages = await messagePromise;


            return { body:messages, error: false };

        } catch (error) {
            console.log(error);
            return { error: true, response:``, body:{} }
        }
    }

    

}
