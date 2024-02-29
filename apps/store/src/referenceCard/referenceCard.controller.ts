import { Controller, Get, Param } from '@nestjs/common';
import { ReferenceCardService } from './referenceCard.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reference-card')
@Controller('reference-card')
export class ReferenceCardController {
	constructor(private referenceCardService: ReferenceCardService) {}
	@Get('update-pokemons')
	updatePokemonList() {
		return this.referenceCardService.fetchPokemonData();
	}
	@Get('list-all')
	listAll() {
		return this.referenceCardService.listAllPokemons();
	}
	@Get('list-one/:name')
	listOne(@Param('name') name: string) {
		return this.referenceCardService.listOnePokemon(name);
	}
}
