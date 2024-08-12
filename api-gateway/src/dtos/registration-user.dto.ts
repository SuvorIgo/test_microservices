import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegistrationUserDto {
    @ApiProperty({ description: 'User login' })
    @IsString({ message: 'login должно быть строковым значением' })
    @IsNotEmpty({ message: 'login должно быть задано' })
    login: string;

    @ApiProperty({ description: 'User password' })
    @IsString({ message: 'password должно быть строковым значением' })
    @IsNotEmpty({ message: 'password должно быть задано' })
    password: string;
}