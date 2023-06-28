import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateAuthorBoardEvent } from './update-author-board.event';

@EventsHandler(UpdateAuthorBoardEvent)
export class UpdateBoardEventHandler
  implements IEventHandler<UpdateAuthorBoardEvent>
{
  handle(event: UpdateAuthorBoardEvent) {
    switch (event.name) {
      case UpdateAuthorBoardEvent.name:
        this.updateAuthorBoard();
        break;
      default:
        break;
    }
  }

  updateAuthorBoard() {
    console.log('updateAuthorBoard');
  }
}
