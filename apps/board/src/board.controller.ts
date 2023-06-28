import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBoardDto } from './dto/create-board.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBoardCommand } from './command/create-board.command';

@Controller()
export class BoardController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'createBoard' })
  async createBoard(data: CreateBoardDto): Promise<string> {
    const { title, content, email } = data;
    return await this.commandBus.execute(
      new CreateBoardCommand(title, content, email),
    );
  }
}
