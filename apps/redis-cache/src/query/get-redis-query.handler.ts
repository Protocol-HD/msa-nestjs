import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { GetRedisQuery } from './get-redis.query';

@QueryHandler(GetRedisQuery)
export class GetRedisQueryHandler implements IQueryHandler<GetRedisQuery> {
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async execute(query: GetRedisQuery): Promise<unknown> {
    const { key } = query;
    return await this.redis.get(key);
  }
}
