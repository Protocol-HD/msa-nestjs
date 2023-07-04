import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class UpdateBoardAuthorEvent extends CqrsEvent implements IEvent {
  constructor(readonly userId: number) {
    super(UpdateBoardAuthorEvent.name);
  }
}
