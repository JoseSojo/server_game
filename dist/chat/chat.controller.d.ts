import { PrompService } from 'src/promp/promp.service';
import { SenseiService } from 'src/sensei/sensei.service';
import { UserService } from 'src/user/user.service';
import { CreatePrompDto } from 'src/promp/dto/create.dto';
export declare class ChatController {
    private promp;
    private sensei;
    private user;
    constructor(promp: PrompService, sensei: SenseiService, user: UserService);
    new(body: CreatePrompDto, req: any): Promise<{
        error: boolean;
        response: string;
        body: {};
    } | {
        response: {
            id: number;
            message: string;
            origin: boolean;
            createAt: Date;
            senseiId: number;
        };
        body: {
            id: number;
            message: string;
            origin: boolean;
            createAt: Date;
            senseiId: number;
        };
        error: boolean;
    }>;
    findAll(query: {
        limit?: string;
        skip?: string;
        id: string;
    }): Promise<{
        body: {
            id: number;
            message: string;
            origin: boolean;
            createAt: Date;
            senseiId: number;
        }[];
        error: boolean;
        response?: undefined;
    } | {
        error: boolean;
        response: string;
        body: {};
    }>;
}
