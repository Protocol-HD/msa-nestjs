import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { DelRedisCommand } from './command/del-redis.command';
import { SetRedisCommand } from './command/set-redis.command';
import { GetRedisQuery } from './query/get-redis.query';

@Controller()
export class RedisCacheController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: 'getRedis' })
  async getRedis(input: GetRedisQuery) {
    const { key } = input;
    this.queryBus.execute(new GetRedisQuery(key));
  }

  @MessagePattern({ cmd: 'setRedis' })
  async setRedis(input: SetRedisCommand) {
    const { key, value, ttl } = input;
    this.commandBus.execute(new SetRedisCommand(key, value, ttl));
  }

  @MessagePattern({ cmd: 'delRedis' })
  async delRedis(input: DelRedisCommand) {
    const { key } = input;
    this.commandBus.execute(new DelRedisCommand(key));
  }

  @EventPattern({ cmd: 'setRedis' })
  async setRedisEvent(input: SetRedisCommand) {
    const { key, value, ttl } = input;
    this.commandBus.execute(new SetRedisCommand(key, value, ttl));
  }

  @EventPattern({ cmd: 'delRedis' })
  async delRedisEvent(input: DelRedisCommand) {
    const { key } = input;
    this.commandBus.execute(new DelRedisCommand(key));
  }
}
