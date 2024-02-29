import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.create(StoreModule);
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers: ['localhost:9092'],
			},
			consumer: {
				groupId: 'store-consumer',
			},
		},
	});
	const config = new DocumentBuilder()
		.addCookieAuth('token')
		.setTitle('NestJS API')
		.setDescription('NestJS API Boilerplate')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transformOptions: {
				enableImplicitConversion: true, // allow conversion underneath
			},
		}),
	);
	app.use(cookieParser());
	app.startAllMicroservices();
	await app.listen(3000);
}
bootstrap();
