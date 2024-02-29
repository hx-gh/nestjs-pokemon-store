import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [
		PrismaModule,
		ClientsModule.register([
			{
				name: 'PAYMENTS_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'payments',
						brokers: ['localhost:9092'],
					},
				},
			},
		]),
	],
	providers: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
