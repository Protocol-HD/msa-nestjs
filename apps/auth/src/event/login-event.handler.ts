import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { RefreshTokenStoreEvent } from './refresh-token-store.event';

@EventsHandler(RefreshTokenStoreEvent)
export class LoginEventHandler
  implements IEventHandler<RefreshTokenStoreEvent>
{
  constructor(
    @Inject('REDIS_CACHE_SERVICE')
    private readonly redisCacheClient: ClientProxy,
  ) {}

  async handle(event: RefreshTokenStoreEvent) {
    switch (event.name) {
      case RefreshTokenStoreEvent.name:
        this.redisCacheClient.emit(
          { cmd: 'setRedis' },
          {
            key: `REFRESH_TOKEN:${event.email}`,
            value: event.refreshToken,
            ttl: 60 * 60 * 24 * 7,
          },
        );
        break;
      default:
        break;
    }
  }
}
