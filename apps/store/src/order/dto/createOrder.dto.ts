import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';

class CardForSale {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	id: number;
}
export class CreateOrderDto {
	@ApiProperty({ type: [CardForSale] })
	@ValidateNested({ each: true })
	@Type(() => CardForSale)
	cards: CardForSale[];
}
