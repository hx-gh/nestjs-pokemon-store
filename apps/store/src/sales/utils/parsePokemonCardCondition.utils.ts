import { PokemonCardCondition } from '.prisma/client/store';

export function parsePokemonCardCondition(
	conditionString: string,
): PokemonCardCondition | null {
	switch (conditionString.toUpperCase()) {
		case 'MINT':
			return PokemonCardCondition.MINT;
		case 'NEAR MINT':
			return PokemonCardCondition.NEAR_MINT;
		case 'EXCELLENT':
			return PokemonCardCondition.EXCELLENT;
		case 'LIGHTLY PLAYED':
			return PokemonCardCondition.LIGHTLY_PLAYED;
		case 'PLAYED':
			return PokemonCardCondition.PLAYED;
		case 'HEAVILY PLAYED':
			return PokemonCardCondition.HEAVILY_PLAYED;
		case 'DAMAGED':
			return PokemonCardCondition.DAMAGED;
		default:
			return null; // Return null if the conditionString doesn't match any known condition
	}
}
