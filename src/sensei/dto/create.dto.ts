import {
    IsString,
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class CreateSenseiDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    tema: string

    @IsNumber()
    @IsNotEmpty()
    userId: number

}
