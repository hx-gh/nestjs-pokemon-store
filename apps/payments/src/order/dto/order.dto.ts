import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class OrderDto {
	@IsNotEmpty()
	@IsInt()
	id: number;
	@IsNotEmpty()
	@IsInt()
	totalPrice: number;
	@IsNotEmpty()
	@IsString()
	status: string;
	@IsNotEmpty()
	@IsInt()
	userId: number;
}
