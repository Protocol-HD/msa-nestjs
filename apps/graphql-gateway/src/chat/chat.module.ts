import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { ChatController } from './chat.controller';
import { ChatResolver } from './chat.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.CHAT.name,
        transport: MICROSERVICE_OPTIONS.CHAT.transport,
        options: MICROSERVICE_OPTIONS.CHAT.options,
      },
    ]),
    // RedisModule.forRoot({
    //   config: {
    //     host: process.env.REDIS_HOST,
    //     port: +process.env.REDIS_PORT,
    //     password: process.env.REDIS_PASSWORD,
    //   },
    // }),
  ],
  controllers: [ChatController],
  providers: [ChatResolver, PubSub],
})
export class ChatModule {}
