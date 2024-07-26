import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriptionDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

}
