import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { Observable } from 'rxjs';
import { LoginTokens } from '../auth/dto/login-tokens.dto';
import { OauthLoginDto } from './dto/oauth-login.dto';

@Controller('oauth')
export class OauthController {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.OAUTH.name)
    private readonly oauthClient: ClientProxy,
  ) {}

  @Post('/kakao/login')
  kakaoLogin(@Body() input: OauthLoginDto): Observable<LoginTokens> {
    return this.oauthClient.send({ cmd: 'kakaoLogin' }, input);
  }

  @Post('/naver/login')
  naverLogin(@Body() input: OauthLoginDto): Observable<LoginTokens> {
    return this.oauthClient.send({ cmd: 'naverLogin' }, input);
  }

  @Post('/google/login')
  googleLogin(@Body() input: OauthLoginDto): Observable<LoginTokens> {
    return this.oauthClient.send({ cmd: 'googleLogin' }, input);
  }

  @Post('/twitter/login')
  twitterLogin(@Body() input: OauthLoginDto): Observable<LoginTokens> {
    return this.oauthClient.send({ cmd: 'twitterLogin' }, input);
  }
}
