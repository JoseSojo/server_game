import { 
    IsString,
    IsNotEmpty,
    IsNumber,
} from "class-validator";


export class CreateSubscriptionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    limitSensei: number

}
