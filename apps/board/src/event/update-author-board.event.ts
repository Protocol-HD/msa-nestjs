import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class UpdateAuthorBoardEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(UpdateAuthorBoardEvent.name);
  }
}
