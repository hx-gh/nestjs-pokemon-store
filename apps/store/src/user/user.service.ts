import { Injectable, ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import { Prisma } from '.prisma/client/store';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtUtils } from './jwt/jwt.service';

@Injectable({})
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtUtils,
		private config: ConfigService,
	) {}
	async createUser(dto: SignUpDto): Promise<object> {
		try {
			const hash = await argon.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					name: dto.name,
					username: dto.username,
					email: dto.email,
					password: hash,
				},
				select: {
					id: true,
					email: true,
					name: true,
					password: false,
				},
			});
			const jwt = await this.jwt.signToken(user.email);
			return {
				status: true,
				message: 'User created successfully',
				jwt,
				user,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				}
			}
		}
	}
	async signIn(dto: SignInDto, response: Response) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
			select: {
				id: true,
				email: true,
				name: true,
				password: true,
			},
		});
		//if user does not exists throw exception
		if (!user) throw new ForbiddenException('Incorrect credentials');
		//compare pass
		const pwMatches = await argon.verify(user.password, dto.password);
		//if password is incorrect throw exception
		if (!pwMatches)
			throw new ForbiddenException('Incorrect credentials');
		const jwt = await this.jwt.signToken(user.email);
		delete user.password;
		response.cookie('token', jwt);
		return {
			status: true,
			message: 'User logged successfully',
			user,
		};
	}
}
