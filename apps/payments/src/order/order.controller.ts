import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { OrderService } from './order.service';
import {
	ClientKafka,
	MessagePattern,
	Payload,
} from '@nestjs/microservices';

@Controller('order')
export class OrderController implements OnModuleInit {
	constructor(
		private readonly orderService: OrderService,
		@Inject('PAYMENTS_SERVICE')
		private kafkaClient: ClientKafka,
	) {}
	@Get()
	all() {
		return 'Hello World';
	}
	@MessagePattern('orders')
	async payment(@Payload() message) {
		await this.orderService.processOrder(message);
	}
	async onModuleInit() {
		this.kafkaClient.subscribeToResponseOf('orders');
		await this.kafkaClient.connect();
	}
}
