import { Controller } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Board } from 'prisma/generated/boardClient';
import { CreateBoardCommand } from './command/create-board.command';
import { UpdateBoardAuthorEvent } from './event/update-board-author.event';
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

  @EventPattern({ cmd: 'updateBoardAuthor' })
  async updateAuthorBoard(data: UpdateBoardAuthorEvent): Promise<void> {
    const { userId, author } = data;
    return await this.eventBus.publish(
      new UpdateBoardAuthorEvent(userId, author),
    );
  }
}
