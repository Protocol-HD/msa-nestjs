import { ICommand } from '@nestjs/cqrs';

export class CreateAccessTokenCommand implements ICommand {
  constructor(readonly email: string, readonly refreshToken: string) {}
}
