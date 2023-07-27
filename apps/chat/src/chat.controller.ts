import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: 'sendMessage', clientId: 'test' })
  async sendMessage(input: ChatDto) {
    return await this.chatService.sendMessage(input);
  }
}
