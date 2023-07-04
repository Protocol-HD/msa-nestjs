import { IQuery } from '@nestjs/cqrs';

export class GetRedisQuery implements IQuery {
  constructor(public readonly key: string) {}
}
