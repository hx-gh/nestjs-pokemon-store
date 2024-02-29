import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReferenceCardService {
	constructor(
		private prisma: PrismaService,
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {}
	async fetchPokemonData() {
		const { data } = await firstValueFrom(
			this.httpService.get(
				this.config.get('POKEMONAPI_QUERY') as string,
				{
					headers: {
						'X-Api-Key': this.config.get('POKEMONAPI_KEY'),
					},
				},
			),
		);
		const CreatedObjets = await data.data.forEach(
			async (pokemonObject, length) => {
				const exists = await this.prisma.referenceCard.findFirst({
					where: {
						pokeIndex: parseInt(
							pokemonObject.nationalPokedexNumbers[0],
						),
					},
				});
				if (!exists) {
					return this.createPokemon(pokemonObject);
				}
			},
		);
		return {
			status: true,
			message: 'Pokemons fetched and populated at DB successfully',
			CreatedObjets,
		};
	}
	listAllPokemons() {
		return this.prisma.referenceCard.findMany();
	}
	async listOnePokemon(name: string) {
		const pokemon = await this.prisma.referenceCard.findFirst({
			where: { name },
		});
		if (!pokemon) throw new NotFoundException('Pokemon not found');
		return pokemon;
	}
	async createPokemon(pokemonObject) {
		try {
			const referenceCard = await this.prisma.referenceCard.create({
				data: {
					name: pokemonObject.name,
					supertype: pokemonObject.supertype,
					hp: pokemonObject.hp,
					types: pokemonObject.types,
					imageUrl: pokemonObject.images.large,
					attacks: pokemonObject.attacks,
					weaknesses: pokemonObject.weaknesses
						? pokemonObject.weaknesses
						: null,
					abilities: pokemonObject.abilities
						? pokemonObject.abilities
						: null,
					pokeIndex: pokemonObject.nationalPokedexNumbers[0],
					rarity: pokemonObject.rarity,
					flavorText: pokemonObject.flavorText
						? pokemonObject.flavorText
						: null,
				},
			});
			return referenceCard;
		} catch (error) {
			console.error(error, pokemonObject.name);
			throw new InternalServerErrorException(error);
		}
	}
}
