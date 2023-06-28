import { ICommand } from '@nestjs/cqrs';

export class CreateBoardCommand implements ICommand {
  constructor(
    readonly title: string,
    readonly content: string,
    readonly email: string,
  ) {}
}
