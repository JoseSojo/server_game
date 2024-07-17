import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class CreateNotificationDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    @IsNotEmpty()
    type: `default`

    @IsString()
    @IsNotEmpty()
    by: `ia` | `system` | `user`
}
