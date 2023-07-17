import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class TwitterLoggedInEvent extends CqrsEvent implements IEvent {
  constructor(public readonly accessToken: string) {
    super(TwitterLoggedInEvent.name);
  }
}
