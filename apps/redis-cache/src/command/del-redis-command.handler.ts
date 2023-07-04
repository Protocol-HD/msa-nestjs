import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { DelRedisCommand } from './del-redis.command';

@Injectable()
@CommandHandler(DelRedisCommand)
export class DelRedisCommandHandler
  implements ICommandHandler<DelRedisCommand>
{
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async execute(command: DelRedisCommand): Promise<void> {
    const { key } = command;
    return await this.redis.del(key);
  }
}
