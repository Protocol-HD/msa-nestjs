import { ICommand } from '@nestjs/cqrs';

export class SetRedisCommand implements ICommand {
  constructor(
    readonly key: string,
    readonly value: any,
    readonly ttl?: number,
  ) {}
}
