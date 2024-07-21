import { NotificationService } from 'src/notification/notification.service';
import { TranslateService } from 'src/translate/translate.service';
import { UserService } from 'src/user/user.service';
import { SenseiService } from './sensei.service';
import { PrompService } from 'src/promp/promp.service';
import { CreateSenseiDto } from './dto/create.dto';
import { Response as ResponseType } from 'express';
import { CreatePrompDto } from 'src/promp/dto/create.dto';
import { HttpService } from '@nestjs/axios';
export declare class SenseiController {
    private trans;
    private user;
    private notification;
    private sensei;
    private promp;
    private http;
    constructor(trans: TranslateService, user: UserService, notification: NotificationService, sensei: SenseiService, promp: PrompService, http: HttpService);
    create(data: any, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    update(data: CreateSenseiDto, id: string, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    prompCreate(data: CreatePrompDto, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    getSenseis(id: string, query: {
        pag?: string;
        limit?: string;
    }, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
}
