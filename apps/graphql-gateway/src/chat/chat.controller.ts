import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly pubSub: PubSub) {}

  @MessagePattern({ cmd: 'receiveMessage' })
  async receiveMessage(input: ChatDto) {
    const { channel, message } = input;
    return this.pubSub.publish(channel, message);
  }
}
