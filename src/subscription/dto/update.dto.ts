import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubscriptionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
