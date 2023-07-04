import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'libs/event/cqrs.event';

export class RefreshTokenStoreEvent extends CqrsEvent implements IEvent {
  constructor(readonly email: string, readonly refreshToken: string) {
    super(RefreshTokenStoreEvent.name);
  }
}
