import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
	/* Auth DTO Class */
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;
}
