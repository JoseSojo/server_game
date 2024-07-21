import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsNumber,
} from "class-validator";

export class CreatePrompDto {

    @IsString()
    @IsNotEmpty()
    message: string

    @IsNumber()
    @IsNotEmpty()
    senseiId: number

    @IsBoolean()
    @IsNotEmpty()
    origin: boolean

}
