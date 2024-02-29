import {
	Body,
	Controller,
	Param,
	Post,
	Get,
	ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from '../user/decorator/getUser.decorator';
import { User } from '.prisma/client/store';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatus } from '.prisma/client/store';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiCookieAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}
	@Get('list-order/:id')
	listOne(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.listOne(id);
	}
	@Get('list-orders')
	listAllUser(@GetUser() user: User) {
		return this.orderService.listAll(user);
	}
	@Post('create-order')
	createOrder(@Body() data: CreateOrderDto, @GetUser() user: User) {
		return this.orderService.createOrder(data, user);
	}
	@MessagePattern('payments')
	async complete(@Payload() message) {
		await this.orderService.completeOrder(
			message.id,
			message.status === 'APPROVED'
				? OrderStatus.APPROVED
				: OrderStatus.CANCELLED,
		);
	}
}
