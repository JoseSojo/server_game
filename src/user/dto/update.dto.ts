import { 
    IsString,
    IsEmail,
    IsNotEmpty,
} from "class-validator";

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    lastname:string

}
