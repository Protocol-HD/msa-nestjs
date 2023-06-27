import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class CreateUserEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(CreateUserEvent.name);
  }
}
