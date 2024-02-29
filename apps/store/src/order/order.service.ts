import {
	ForbiddenException,
	Inject,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import {
	User,
	CardForSale,
	OrderStatus,
	CardStatus,
} from '.prisma/client/store';
import { CreateOrderDto } from './dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { lastValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		@Inject('STORE_SERVICE')
		private kafkaClient: ClientKafka,
	) {}
	async listOne(orderId: number) {
		return this.prisma.order.findUnique({
			where: { id: orderId },
			include: { cardsForSale: true },
		});
	}
	async listAll(user: User) {
		return this.prisma.order.findMany({
			where: { userId: user.id },
			include: { cardsForSale: true },
		});
	}
	async createOrder(data: CreateOrderDto, user: User) {
		const OrderedCards = await Promise.all(
			data.cards.map(async (cardItem) => {
				const card = await this.prisma.cardForSale.findUnique({
					where: {
						id: cardItem.id,
					},
				});
				if (!card || card.status !== CardStatus.PENDING)
					throw new ForbiddenException(
						"Listed card doesn't exists or isn't available for purchase",
					);
				return card;
			}),
		);
		const orderTotal = await this.sumOrderedCardValues(OrderedCards);
		try {
			const transaction = await this.prisma.$transaction(
				async (tx) => {
					const orderObject = {
						totalPrice: orderTotal,
						status: OrderStatus.PENDING,
						userId: user.id,
					};
					const order = await tx.order.create({
						data: orderObject,
					});
					const updatedCardsForSale = await Promise.all(
						OrderedCards.map(async (cardItem) => {
							const updatedCard = tx.cardForSale.update({
								where: {
									id: cardItem.id,
								},
								data: {
									orderId: order.id,
									status: CardStatus.PENDING,
								},
							});
							return updatedCard;
						}),
					);
					await lastValueFrom(
						this.kafkaClient.emit('orders', order),
					);
					return order;
				},
			);
			return {
				status: true,
				message: 'Order created successfully',
				transaction,
			};
		} catch (error) {
			throw new InternalServerErrorException(
				'Error while creating order',
				error,
			);
		}
	}
	completeOrder(id: number, status: OrderStatus) {
		const transaction = this.prisma.$transaction(async (trx) => {
			const order = await trx.order.findUnique({
				where: { id },
				include: { cardsForSale: true },
			});
			const updatedCards = await Promise.all(
				order.cardsForSale.map(async (cardItem) => {
					const card = await trx.cardForSale.update({
						where: { id: cardItem.id },
						data: {
							status: CardStatus.SELLED,
						},
					});
				}),
			);
			const updatedOrder = await trx.order.update({
				where: { id },
				data: { status },
			});
			return [updatedCards, updatedOrder];
		});
		console.log(transaction);
		return { status: true, message: 'Order updated successfully' };
	}
	sumOrderedCardValues(orderedCards: CardForSale[]): Promise<number> {
		let totalValue = 0;

		for (const orderedCard of orderedCards) {
			totalValue += orderedCard.price;
		}

		return Promise.resolve(totalValue);
	}
}
