import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionController {
    private SubscriptionService;
    constructor(SubscriptionService: SubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    findAll(query: {
        skip?: string;
        take?: string;
    }): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
}
