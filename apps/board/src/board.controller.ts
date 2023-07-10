import { Controller } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Board } from 'libs/prisma/boardClient';
import { CreateBoardCommand } from './command/create-board.command';
import { UpdatedBoardAuthorEvent } from './event/updated-board-author.event';
import { GetBoardsQuery } from './query/get-boards.query';

@Controller()
export class BoardController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  @MessagePattern({ cmd: 'getBoards' })
  async getBoards(): Promise<Board[]> {
    return await this.queryBus.execute(new GetBoardsQuery());
  }

  @MessagePattern({ cmd: 'createBoard' })
  async createBoard(data: CreateBoardCommand): Promise<Board> {
    const { title, content, email } = data;
    return await this.commandBus.execute(
      new CreateBoardCommand(title, content, email),
    );
  }

  // Zero-Payload Event 예제로 사용하기 위해 userId만 전달받음
  @EventPattern({ cmd: 'updateBoardAuthor' })
  async updateAuthorBoard(data: UpdatedBoardAuthorEvent): Promise<void> {
    const { userId } = data;
    return await this.eventBus.publish(new UpdatedBoardAuthorEvent(userId));
  }
}
