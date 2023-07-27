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
    this.subscriber.on('message', (channel, json) => {
      console.log('channel', channel, 'json', json);
      const { clientId, message } = JSON.parse(json);
      this.graphqlGatewayClient
        .send({ cmd: 'receiveMessage', clientId }, { channel, message })
        .subscribe();
    });
  }

  async sendMessage(input: ChatDto) {
    const { channel, message, clientId } = input;

    if (!this.channels.includes(channel)) {
      this.channels.push(channel);
      await this.subscriber.subscribe(channel);
    }

    const json = JSON.stringify({ clientId, message });

    return this.publisher.publish(channel, json);
  }
}
