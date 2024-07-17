import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create.dto';
import { UpdateSubscriptionDto } from './dto/update.dto';
import { Response as ResponseType } from 'express';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    findAll(query: any, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    findOne(id: string, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto, res: ResponseType): Promise<ResponseType<any, Record<string, any>>>;
}
