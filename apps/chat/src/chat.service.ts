import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Redis } from 'ioredis';
import { GATEWAY_OPTIONS } from 'libs/constants/microservice.constant';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  publisher: Redis;
  subscriber: Redis;
  channels: string[] = [];

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject(GATEWAY_OPTIONS.GRAPHQL_GATEWAY.name)
    private readonly graphqlGatewayClient: ClientProxy,
  ) {
    this.publisher = this.redis.duplicate();
    this.subscriber = this.redis.duplicate();
  }

  onModuleInit() {
    this.subscriber.on('message', (channel, message) => {
      this.graphqlGatewayClient
        .send({ cmd: 'receiveMessage' }, { channel, message })
        .subscribe();
    });
  }

  async sendMessage(input: ChatDto) {
    const { channel, message } = input;

    if (!this.channels.includes(channel)) {
      this.channels.push(channel);
      await this.subscriber.subscribe(channel);
    }

    return this.publisher.publish(channel, message);
  }
}