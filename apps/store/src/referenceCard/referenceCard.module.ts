import { Module } from '@nestjs/common';
import { ReferenceCardService } from './referenceCard.service';
import { ReferenceCardController } from './referenceCard.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 10000,
				maxRedirects: 5,
			}),
		}),
	],
	providers: [ReferenceCardService],
	controllers: [ReferenceCardController],
})
export class ReferenceCardModule {}
