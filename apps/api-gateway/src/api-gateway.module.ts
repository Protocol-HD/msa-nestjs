import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { JwtStrategy } from 'libs/auth/jwt.strategy';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { OauthModule } from './oauth/oauth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.REDIS_CACHE.name,
        transport: MICROSERVICE_OPTIONS.REDIS_CACHE.transport,
        options: MICROSERVICE_OPTIONS.REDIS_CACHE.options,
      },
    ]),
    UserModule,
    AuthModule,
    BoardModule,
    OauthModule,
  ],
  providers: [JwtStrategy],
})
export class ApiGatewayModule {}
