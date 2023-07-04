import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { SetRedisCommand } from './set-redis.command';

@Injectable()
@CommandHandler(SetRedisCommand)
export class DelRedisCommandHandler
  implements ICommandHandler<SetRedisCommand>
{
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async execute(command: SetRedisCommand): Promise<void> {
    const { key } = command;
    await this.redis.del(key);
  }
}
