import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly password: string,
    readonly role: number,
  ) {}
}
