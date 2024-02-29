import {
	ForbiddenException,
	Global,
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtUtils } from './jwt.service';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Global()
@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtUtils,
		private prisma: PrismaService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		if (!req.cookies) throw new ForbiddenException('Forbidden');
		const authHeader = req.cookies.token;
		const payload = await this.jwtService.verifyToken(authHeader);
		if (payload.status === false)
			throw new UnauthorizedException('Forbidden');
		req['user'] = payload.data.email;
		next();
	}
}
