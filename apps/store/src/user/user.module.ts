import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { JwtUtils } from './jwt/jwt.service';
import { JwtMiddleware } from './jwt/jwt.middleware';

@Module({
	imports: [JwtModule.register({})],
	providers: [UserService, JwtStrategy, JwtUtils],
	controllers: [UserController],
	exports: [JwtUtils],
})
export class UserModule {}
