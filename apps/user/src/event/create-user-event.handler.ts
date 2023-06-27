import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateUserEvent } from './create-user.event';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler implements IEventHandler<CreateUserEvent> {
  handle(event: CreateUserEvent) {
    console.log(event);
  }
}
