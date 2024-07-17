import { 
    IsString,
    IsNotEmpty,
} from "class-validator";


export class CreateSubscriptionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
