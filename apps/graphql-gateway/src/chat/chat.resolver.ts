import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { v4 } from 'uuid';
import { ChatDto } from './dto/chat.dto';

export const CLIENT_ID = v4();

@Resolver()
export class ChatResolver {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.CHAT.name)
    private readonly chatClient: ClientProxy,
    private readonly pubSub: PubSub,
  ) {}

  @Subscription(() => String, {
    name: 'subscribeChat',
    resolve: (message: string) => message,
  })
  async subscribeChat(@Args('channel') channel: string) {
    return this.pubSub.asyncIterator(channel);
  }

  @Mutation(() => String)
  sendMessage(@Args('input') input: ChatDto) {
    input.clientId = CLIENT_ID;
    return this.chatClient.send<string>({ cmd: 'sendMessage' }, input);
  }
}
