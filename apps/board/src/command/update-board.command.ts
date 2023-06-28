import { ICommand } from '@nestjs/cqrs';

export class UpdateBoardCommand implements ICommand {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly content: string,
    readonly author: string,
  ) {}
}
