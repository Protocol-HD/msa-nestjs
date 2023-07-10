import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class UpdatedBoardAuthorEvent extends CqrsEvent implements IEvent {
  constructor(readonly userId: number) {
    super(UpdatedBoardAuthorEvent.name);
  }
}
