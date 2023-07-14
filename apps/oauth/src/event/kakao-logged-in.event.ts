import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class KakaoLoggedInEvent extends CqrsEvent implements IEvent {
  constructor(public readonly accessToken: string) {
    super(KakaoLoggedInEvent.name);
  }
}
