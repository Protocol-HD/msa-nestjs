import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { GATEWAY_OPTIONS } from 'libs/constants/microservice.constant';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    ClientsModule.register([
      {
        name: GATEWAY_OPTIONS.GRAPHQL_GATEWAY.name,
        transport: GATEWAY_OPTIONS.GRAPHQL_GATEWAY.transport,
        options: GATEWAY_OPTIONS.GRAPHQL_GATEWAY.options,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
