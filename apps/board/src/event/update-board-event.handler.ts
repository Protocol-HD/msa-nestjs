import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateBoardAuthorEvent } from './update-board-author.event';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'libs/entities/board.entity';
import { Repository } from 'typeorm';

@EventsHandler(UpdateBoardAuthorEvent)
export class UpdateBoardEventHandler
  implements IEventHandler<UpdateBoardAuthorEvent>
{
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  handle(event: UpdateBoardAuthorEvent) {
    switch (event.name) {
      case UpdateBoardAuthorEvent.name:
        this.boardRepository.update(
          { userId: event.userId },
          { author: event.author },
        );
        break;
      default:
        break;
    }
  }
}
