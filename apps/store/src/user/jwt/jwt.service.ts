import {
	ForbiddenException,
	Global,
	Injectable,
	OnModuleInit,
} from '@nestjs/common';
import {
	createCipheriv,
	createDecipheriv,
	randomBytes,
	scrypt,
} from 'crypto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { promisify } from 'util';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Global()
@Injectable()
export class JwtUtils implements OnModuleInit {
	private key: Buffer;
	private iv: Buffer;
	private secret: string;
	constructor(
		private jwtService: JwtService,
		private config: ConfigService,
		private prisma: PrismaService,
	) {}
	async onModuleInit() {
		await this.generateEncryptionKey();
	}
	async generateEncryptionKey() {
		const encSecret = this.config.get('JWT_ENCRYPTION_SECRET');
		const hashKey = (await promisify(scrypt)(
			encSecret,
			'salt',
			32,
		)) as Buffer;
		this.iv = randomBytes(16);
		this.secret = this.config.get('JWT_SECRET');
		return (this.key = hashKey);
	}
	async signToken(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		if (!user) throw new ForbiddenException('Forbidden');
		const token = await this.jwtService.signAsync(
			{ sub: user.id, email },
			{ expiresIn: '15m', secret: this.secret },
		);
		const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
		const key = Buffer.concat([cipher.update(token), cipher.final()]);
		const tokenHex = key.toString('hex');
		return tokenHex;
	}
	async verifyToken(encryptedToken) {
		const decipher = createDecipheriv(
			'aes-256-ctr',
			this.key,
			this.iv,
		);
		const decryptedTokenBuffer = Buffer.concat([
			decipher.update(Buffer.from(encryptedToken, 'hex')),
			decipher.final(),
		]);
		const decryptedToken = decryptedTokenBuffer.toString('utf8');
		const regex =
			/^(?:[\u0000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])*$/;
		if (!regex.test(decryptedToken))
			return { status: false, message: 'Decryption failed' };
		try {
			const data = await this.jwtService.verifyAsync(
				decryptedToken,
				{
					secret: this.secret,
				},
			);
			return { status: true, message: 'Success', data };
		} catch (error) {
			return { status: false, message: 'JWT verification failed' };
		}
	}
}
