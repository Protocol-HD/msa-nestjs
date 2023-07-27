import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { ChatDto } from './dto/chat.dto';

@Resolver()
export class ChatResolver {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.CHAT.name)
    private readonly chatClient: ClientProxy,
    private readonly pubSub: PubSub,
  ) {}

  // pubsub에 메시지 구독하기
  @Subscription(() => String, {
    name: 'subscribeChat',
    resolve: (message: string) => message,
  })
  async subscribeChat(@Args('channel') channel: string) {
    return this.pubSub.asyncIterator(channel);
  }

  // 메시지 보내기
  @Mutation(() => String)
  sendMessage(@Args('input') input: ChatDto) {
    return this.chatClient.send<string>({ cmd: 'sendMessage' }, input);
  }
}
