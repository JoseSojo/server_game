import { 
    IsString,
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    message: string

    @IsNumber()
    @IsNotEmpty()
    senseiId: number

}
