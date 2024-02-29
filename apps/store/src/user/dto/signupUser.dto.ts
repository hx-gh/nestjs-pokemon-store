import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	username: string;
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;
}
