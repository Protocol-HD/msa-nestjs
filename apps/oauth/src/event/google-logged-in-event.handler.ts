import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GoogleLoggedInEvent } from './google-logged-in.event';

@EventsHandler(GoogleLoggedInEvent)
export class GoogleLoggedInEventHandler
  implements IEventHandler<GoogleLoggedInEvent>
{
  handle(event: GoogleLoggedInEvent) {
    switch (event.name) {
      case GoogleLoggedInEvent.name:
        break;
      default:
        break;
    }
  }
}
