import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAccessTokenCommand } from './command/create-access-token.command';
import { LoginCommand } from './command/login.command';
import { LoginTokens } from './dto/login-tokens.dto';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'login' })
  async login(input: LoginCommand): Promise<LoginTokens> {
    const { email, password } = input;
    return await this.commandBus.execute(new LoginCommand(email, password));
  }

  @MessagePattern({ cmd: 'createAccessToken' })
  async createAccessToken(
    input: CreateAccessTokenCommand,
  ): Promise<LoginTokens> {
    const { email, refreshToken } = input;
    return await this.commandBus.execute(
      new CreateAccessTokenCommand(email, refreshToken),
    );
  }
}
