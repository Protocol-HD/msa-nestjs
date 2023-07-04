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
    @Inject('REDIS_CACHE_SERVICE')
    private readonly redisCacheClient: ClientProxy,
  ) {}

  async execute(
    command: CreateAccessTokenCommand,
  ): Promise<LoginTokens | HttpException> {
    const observableData = this.userClient.send(
      { cmd: 'getUser' },
      command.email,
    );

    const user: User = await firstValueFrom(observableData);

    if (!user) {
      return new HttpException('NOT_EXIST_EMAIL', HttpStatus.NOT_FOUND);
    }

    const observableData2 = this.redisCacheClient.send(
      { cmd: 'getRedis' },
      { key: `REFRESH_TOKEN:${user.email}` },
    );

    const refreshToken: string = await firstValueFrom(observableData2);

    // 유일 리프레시 토큰 검사
    if (!refreshToken || refreshToken !== command.refreshToken) {
      return new HttpException('INVALID_REFRESH_TOKEN', HttpStatus.BAD_REQUEST);
    }

    // 리프레시 토큰 검사
    // const verifyRefreshToken = this.jwtService.verify(command.refreshToken);
    // if (!verifyRefreshToken) {
    //   return new HttpException('INVALID_REFRESH_TOKEN', HttpStatus.BAD_REQUEST);
    // }

    const payload = { email: user.email, role: user.role, id: user.id };

    const loginTokens: LoginTokens = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: '',
    };

    return loginTokens;
  }
}
