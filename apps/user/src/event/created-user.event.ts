import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class CreatedUserEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(CreatedUserEvent.name);
  }
}
