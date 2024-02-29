import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SalesModule } from '../sales/sales.module';

@Module({
	imports: [
		SalesModule,
		ClientsModule.register([
			{
				name: 'STORE_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'orders',
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
