import {
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { parsePokemonCardCondition } from './utils/parsePokemonCardCondition.utils';
import { CardStatus, User } from '.prisma/client/store';
import { createCardForSaleDto } from './dto';

@Injectable()
export class SalesService {
	constructor(private prisma: PrismaService) {}
	async createCardForSale(data: createCardForSaleDto, user: User) {
		const refId = parseInt(data.referenceCardId);
		const referenceCard = await this.prisma.referenceCard.findUnique({
			where: { id: refId },
		});
		if (!referenceCard)
			throw new NotFoundException(
				'Reference card not found in database',
			);
		try {
			const price = parseInt(data.price);
			const cardForSale = await this.prisma.cardForSale.create({
				data: {
					price,
					imageUrl: data.imageUrl,
					condition: parsePokemonCardCondition(data.condition),
					status: CardStatus.PENDING,
					referenceCardId: referenceCard.id,
					userId: user.id,
				},
			});
			return {
				status: true,
				message: 'Card created successfully',
				cardForSale,
			};
		} catch (error) {
			throw new InternalServerErrorException(
				'Error while creating card for sale',
			);
		}
	}
	async listCardsForSaleFromUser(user: User) {
		const cardsForSale = await this.prisma.cardForSale.findMany({
			where: {
				userId: user.id,
			},
			include: { referenceCard: true },
		});
		return {
			status: true,
			message: "Successfully fetched data for 'cardForSale'",
			cardsForSale,
		};
	}
	async listCardForSale(cardName: string) {
		console.log(cardName);
		return this.prisma.referenceCard.findFirst({
			where: { name: cardName },
			include: { cardsForSale: true },
		});
	}
}
