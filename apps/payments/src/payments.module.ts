import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [PrismaModule, OrderModule],
	providers: [],
})
export class PaymentsModule {}
