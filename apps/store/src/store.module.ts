import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ReferenceCardModule } from './referenceCard/referenceCard.module';
import { SalesModule } from './sales/sales.module';
import { JwtMiddleware } from './user/jwt/jwt.middleware';
import { OrderModule } from './order/order.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot(),
		PrismaModule,
		UserModule,
		ReferenceCardModule,
		SalesModule,
		OrderModule,
	],
})
export class StoreModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes('sales', 'order');
	}
}
