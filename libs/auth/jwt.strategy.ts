import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.REDIS_CACHE.name)
    private readonly redisCacheClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    console.log('### Jwt Strategy ###');
    console.log({ payload });

    const observableData = this.redisCacheClient.send(
      { cmd: 'getRedis' },
      { key: 'DELETED_USER:' + payload.email },
    );

    const isDeleted: boolean = await firstValueFrom(observableData);
    if (isDeleted)
      throw new HttpException('DELETED_USER', HttpStatus.FORBIDDEN);

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
