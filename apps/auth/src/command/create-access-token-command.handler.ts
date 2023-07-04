import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'libs/prisma/userClient';
import { firstValueFrom } from 'rxjs';
import { LoginTokens } from '../dto/login-tokens.dto';
import { CreateAccessTokenCommand } from './create-access-token.command';

@Injectable()
@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenCommandHandler
  implements ICommandHandler<CreateAccessTokenCommand>
{
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async execute(command: CreateAccessTokenCommand): Promise<LoginTokens> {
    const observableData = this.userClient.send(
      { cmd: 'getUser' },
      command.email,
    );

    const user: User = await firstValueFrom(observableData);

    if (!user) {
      throw new HttpException('NOT_EXIST_EMAIL', HttpStatus.NOT_FOUND);
    }

    const verifyRefreshToken = this.jwtService.verify(command.refreshToken);
    if (!verifyRefreshToken) {
      throw new HttpException('INVALID_REFRESH_TOKEN', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: user.email, role: user.role, id: user.id };

    const loginTokens: LoginTokens = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: '',
    };

    return loginTokens;
  }
}
