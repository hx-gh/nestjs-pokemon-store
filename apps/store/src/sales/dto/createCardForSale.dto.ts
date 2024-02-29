import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class createCardForSaleDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	price: string;
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	condition: string;
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	imageUrl: string;
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	referenceCardId: string;
}
