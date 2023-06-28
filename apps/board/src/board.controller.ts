import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBoardDto } from './dto/create-board.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBoardCommand } from './command/create-board.command';
import { BoardEntity } from 'libs/entities/board.entity';
import { GetBoardsQuery } from './query/get-boards.query';

@Controller()
export class BoardController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'createBoard' })
  async createBoard(data: CreateBoardDto): Promise<string> {
    const { title, content, email } = data;
    return await this.commandBus.execute(
      new CreateBoardCommand(title, content, email),
    );
  }

  @MessagePattern({ cmd: 'getBoards' })
  async getBoards(): Promise<BoardEntity[]> {
    return await this.queryBus.execute(new GetBoardsQuery());
  }
}
