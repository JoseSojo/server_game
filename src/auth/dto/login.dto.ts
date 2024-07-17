import { 
    IsString,
    IsEmail,
    IsNotEmpty,
} from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

}
