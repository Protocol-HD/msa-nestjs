import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TwitterLoggedInEvent } from './twitter-logged-in.event';

@EventsHandler(TwitterLoggedInEvent)
export class TwitterLoggedInEventHandler
  implements IEventHandler<TwitterLoggedInEvent>
{
  handle(event: TwitterLoggedInEvent) {
    switch (event.name) {
      case TwitterLoggedInEvent.name:
        break;
      default:
        break;
    }
  }
}
