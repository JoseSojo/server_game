import { TranslateService } from 'src/translate/translate.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.dto';
import { Response as ResponseType } from 'express';
import { NotificationService } from 'src/notification/notification.service';
export declare class UserController {
    private trans;
    private service;
    private notification;
    constructor(trans: TranslateService, service: UserService, notification: NotificationService);
    create(data: CreateUserDto): Promise<{
        body: {
            username: string;
            email?: undefined;
        };
        message: string;
    } | {
        body: {
            email: string;
            username?: undefined;
        };
        message: string;
    } | {
        body: {
            id: number;
            name: string;
            lastname: string;
            password: string;
            email: string;
            username: string;
            coin: number;
            createAt: Date;
            updateAt: Date;
            last_session: Date | null;
            rol: string;
            profilePhotoId: number | null;
            wallpaperPhotoId: number | null;
            subscriptionId: number | null;
            levelId: number | null;
        };
        message: string;
    }>;
    getCoin(id: string, req: any, res: Response): Promise<{
        body: {
            coin: number;
        };
        message: string;
    }>;
    getNotifications(id: string, query: {
        pag: number;
        limit?: number;
    }, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    read(id: string, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
}
