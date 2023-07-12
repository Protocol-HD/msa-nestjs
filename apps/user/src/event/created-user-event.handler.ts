import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedUserEvent } from './created-user.event';

@EventsHandler(CreatedUserEvent)
export class CreatedUserEventHandler
  implements IEventHandler<CreatedUserEvent>
{
  handle(event: CreatedUserEvent) {
    switch (event.name) {
      case CreatedUserEvent.name:
        console.log('CreateUserEvent');
        break;
      default:
        break;
    }
  }
}
