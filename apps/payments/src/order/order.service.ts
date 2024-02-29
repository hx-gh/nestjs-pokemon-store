import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OrderDto } from './dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { PaymentStatus } from '.prisma/client/payments';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
	constructor(
		private prismaService: PrismaService,
		@Inject('PAYMENTS_SERVICE')
		private kafkaClient: ClientKafka,
	) {}
	async processOrder(data: OrderDto) {
		console.log(data);
		const payment = await this.prismaService.payment.create({
			data: {
				orderId: data.id,
				amount: data.totalPrice,
				clientId: data.userId,
				status: PaymentStatus.APPROVED,
			},
		});
		await lastValueFrom(this.kafkaClient.emit('payments', payment));
		return payment;
	}
}
