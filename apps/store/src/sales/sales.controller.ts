import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { GetUser } from '../user/decorator/getUser.decorator';
import { createCardForSaleDto } from './dto';
import { SalesService } from './sales.service';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiCookieAuth()
@ApiTags('sales')
@Controller('sales')
export class SalesController {
	constructor(private salesService: SalesService) {}
	@Get('list-all-user')
	listAllFromUser(@GetUser() user) {
		return this.salesService.listCardsForSaleFromUser(user);
	}
	@Get('list-one/:name')
	listOneCard(@Param('name') name: string) {
		return this.salesService.listCardForSale(name);
	}
	@Post('create-sale')
	createSale(@Body() data: createCardForSaleDto, @GetUser() user) {
		return this.salesService.createCardForSale(data, user);
	}
}
