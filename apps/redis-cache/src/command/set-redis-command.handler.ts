import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { SetRedisCommand } from './set-redis.command';

@Injectable()
@CommandHandler(SetRedisCommand)
export class SetRedisCommandHandler
  implements ICommandHandler<SetRedisCommand>
{
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async execute(command: SetRedisCommand): Promise<void> {
    const { key, value, ttl } = command;
    // cache-manager v4 or v2 인 경우 ttl을 객체로 넘겨야 한다.
    return await this.redis.set(key, value, { ttl } as any);
  }
}
