import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class UpdateUserNameEvent extends CqrsEvent implements IEvent {
  constructor(readonly userId: number, readonly author: string) {
    super(UpdateUserNameEvent.name);
  }
}
