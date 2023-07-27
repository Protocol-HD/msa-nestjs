import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule } from '@nestjs/microservices';
import { JwtStrategy } from 'libs/auth/jwt.strategy';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ChatModule } from './chat/chat.module';
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    UserModule,
    AuthModule,
    BoardModule,
    ChatModule,
  ],
  providers: [JwtStrategy],
})
export class GraphqlGatewayModule {}
