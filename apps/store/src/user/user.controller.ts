import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}
	@Get('me')
	getMe() {
		return 'Hello World - Get User';
	}
	@Post('signup')
	create(@Body() dto: SignUpDto) {
		return this.userService.createUser(dto);
	}
	@Post('signin')
	login(
		@Body() dto: SignInDto,
		@Res({ passthrough: true }) response: Response,
	) {
		return this.userService.signIn(dto, response);
	}
	@Patch()
	edit() {
		return 'Hello World - Edit User';
	}
}
