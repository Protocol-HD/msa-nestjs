import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class UpdatedUserNameEvent extends CqrsEvent implements IEvent {
  constructor(readonly userId: number) {
    super(UpdatedUserNameEvent.name);
  }
}
