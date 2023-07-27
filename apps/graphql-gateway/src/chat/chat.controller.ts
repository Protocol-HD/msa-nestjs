import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { CLIENT_ID } from './chat.resolver';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly pubSub: PubSub) {}

  @MessagePattern({ cmd: 'receiveMessage', clientId: CLIENT_ID })
  async receiveMessage(input: ChatDto) {
    const { channel, message } = input;
    return this.pubSub.publish(channel, message);
  }
}
