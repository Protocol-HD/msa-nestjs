import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NaverLoggedInEvent } from './naver-logged-in.event';

@EventsHandler(NaverLoggedInEvent)
export class NaverLoggedInEventHandler
  implements IEventHandler<NaverLoggedInEvent>
{
  handle(event: NaverLoggedInEvent) {
    switch (event.name) {
      case NaverLoggedInEvent.name:
        break;
      default:
        break;
    }
  }
}
