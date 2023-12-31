import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { UpdatedUserNameEvent } from './updated-user-name.event';

@EventsHandler(UpdatedUserNameEvent)
export class UpdatedUserEventHandler
  implements IEventHandler<UpdatedUserNameEvent>
{
  constructor(
    @Inject(MICROSERVICE_OPTIONS.BOARD.name)
    private readonly boardClient: ClientProxy,
  ) {}

  handle(event: UpdatedUserNameEvent) {
    switch (event.name) {
      case UpdatedUserNameEvent.name:
        // Zero-Payload Event 예제로 사용하기 위해 userId만 전달
        this.boardClient.emit(
          { cmd: 'updateBoardAuthor' },
          { userId: event.userId },
        );
        break;
      default:
        break;
    }
  }
}
