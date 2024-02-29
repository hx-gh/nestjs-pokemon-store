import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';

export class GetUserDecorator {
	constructor(private readonly prisma: PrismaService) {}
	async getUser(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const userData = request.user;
		const user = await this.prisma.user.findUnique({
			where: { email: userData },
		});
		delete user.password;
		return user;
	}
}

export const GetUser = createParamDecorator(
	async (data: unknown, ctx: ExecutionContext) => {
		const getUserDecorator = new GetUserDecorator(new PrismaService());
		return await getUserDecorator.getUser(ctx);
	},
);
