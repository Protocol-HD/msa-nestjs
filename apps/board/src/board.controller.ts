import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @MessagePattern({ cmd: 'board' })
  async getUser(): Promise<string> {
    return await this.boardService.getBoard();
  }
}
