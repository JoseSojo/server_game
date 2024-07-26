import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNumber()
    game: number
}
