import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly pubSub: PubSub) {}

  // gateway가 스케일업 해서 여러개라 가정
  @EventPattern({ cmd: 'receiveMessage' })
  async receiveMessage(input: ChatDto) {
    console.log('receiveMessage', input);
    const { channel, name, message } = input;
    return this.pubSub.publish(channel, JSON.stringify({ name, message }));
  }

  // gateway가 스케일업 해서 여러개라 가정
  @EventPattern({ cmd: 'receiveMessage' })
  async receiveMessage2(input: ChatDto) {
    console.log('receiveMessage2', input);
    const { channel, name, message } = input;
    return this.pubSub.publish(channel, JSON.stringify({ name, message }));
  }
}
