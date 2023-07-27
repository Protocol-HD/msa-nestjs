import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 메시지 보내기
  @MessagePattern({ cmd: 'sendMessage' })
  async sendMessage(input: ChatDto) {
    return await this.chatService.sendMessage(input);
  }
}
