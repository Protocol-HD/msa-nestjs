import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Redis } from 'ioredis';
import { GATEWAY_OPTIONS } from 'libs/constants/microservice.constant';
import { v4 } from 'uuid';
import { ChatDto } from './dto/chat.dto';

// chat마이크로서비스가 여러개일 수 있으므로 채널을 구분하기 위해 uuid를 사용
const MICROSERVICE_KEY = v4();

@Injectable()
export class ChatService {
  publisher: Redis;
  subscriber: Redis;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject(GATEWAY_OPTIONS.GRAPHQL_GATEWAY.name)
    private readonly graphqlGatewayClient: ClientProxy,
  ) {
    this.publisher = this.redis.duplicate();
    this.subscriber = this.redis.duplicate();
  }

  onModuleInit() {
    // 자기만의 채널을 구독
    this.subscriber.subscribe(MICROSERVICE_KEY);
    // 메시지가 오면 graphql-gateway 전체로 보내기
    this.subscriber.on('message', (MICROSERVICE_KEY, json) => {
      console.log('channel', MICROSERVICE_KEY, 'json', json);

      const { channel, name, message } = JSON.parse(json);
      this.graphqlGatewayClient.emit(
        { cmd: 'receiveMessage' },
        { channel, name, message },
      );
    });
  }

  // 메시지 보내기
  async sendMessage(input: ChatDto) {
    return this.publisher.publish(MICROSERVICE_KEY, JSON.stringify(input));
  }
}
