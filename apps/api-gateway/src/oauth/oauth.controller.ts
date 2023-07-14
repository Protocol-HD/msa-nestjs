import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { Observable } from 'rxjs';
import { LoginTokens } from '../auth/dto/login-tokens.dto';
import { KakaoLoginDto } from './dto/kakao-login.dto';

@Controller('oauth')
export class OauthController {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.OAUTH.name)
    private readonly oauthClient: ClientProxy,
  ) {}

  @Post('/kakao/login')
  kakaoLogin(@Body() input: KakaoLoginDto): Observable<LoginTokens> {
    return this.oauthClient.send({ cmd: 'kakaoLogin' }, input);
  }
}
