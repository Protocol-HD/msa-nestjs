import { ICommand } from '@nestjs/cqrs';

export class DelRedisCommand implements ICommand {
  constructor(readonly key: string) {}
}
