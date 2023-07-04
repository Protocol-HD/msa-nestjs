import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as argon2 from 'argon2';
import { User } from 'libs/prisma/userClient';
import { firstValueFrom } from 'rxjs';
import { LoginTokens } from '../dto/login-tokens.dto';
import { RefreshTokenStoreEvent } from '../event/refresh-token-store.event';
import { LoginCommand } from './login.command';

@Injectable()
@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async execute(command: LoginCommand): Promise<LoginTokens> {
    const observableData = this.userClient.send(
      { cmd: 'getUser' },
      command.email,
    );

    const user: User = await firstValueFrom(observableData);

    if (!user) {
      throw new HttpException('NOT_EXIST_EMAIL', HttpStatus.NOT_FOUND);
    }

    const isCorrectPassword = await argon2.verify(
      user.password,
      command.password,
    );

    if (!isCorrectPassword) {
      throw new HttpException('INVALID_PASSWORD', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: user.email, role: user.role, id: user.id };
    const loginTokens: LoginTokens = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };

    this.eventBus.publish(
      new RefreshTokenStoreEvent(user.email, loginTokens.refreshToken),
    );

    return loginTokens;
  }
}
