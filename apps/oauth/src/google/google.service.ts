import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import axios from 'axios';
import { OAUTH_URIS } from 'libs/constants/oauth.constant';
import * as uuid from 'uuid';
import { LoginTokens } from '../dto/login-tokens.dto';
import { OauthLoginDto } from '../dto/oauth-login.dto';
import { OauthUserInfoDto } from '../dto/oauth-user-info.dto';
import { GoogleLoggedInEvent } from '../event/google-logged-in.event';
import { OauthService } from '../oauth.service';

@Injectable()
export class GoogleService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly oauthService: OauthService,
  ) {}

  async googleLogin(input: OauthLoginDto): Promise<LoginTokens> {
    const { code, redirectUri, clientId, clientSecret } = input;

    // 구글 로그인을 통해 받은 code를 이용해 access token을 받아온다.
    const accessToken = await this.googleGetAccessToken(
      code,
      redirectUri,
      clientId,
      clientSecret,
    );
    // access token을 이용해 구글 유저 정보를 받아온다.
    const userInfo = await this.googleGetUserInfo(accessToken);

    // 구글 유저 정보를 이용해 구글 로그인 이벤트를 발행한다.
    this.eventBus.publish(new GoogleLoggedInEvent(accessToken));

    // 구글 이메일을 이용해 회원가입 여부를 확인한다.
    const isSignedUp = await this.oauthService.checkEmail(userInfo.email);

    // 회원가입이 되어있지 않다면 회원가입을 진행한다.
    if (!isSignedUp) {
      await this.oauthService.signUp({
        email: userInfo.email,
        password: uuid.v4(),
        name: userInfo.nickname,
        role: 1,
        loginType: 'GOOGLE',
      });
    }

    // 구글 로그인을 통해 로그인을 진행한다.
    const loginTokens = await this.oauthService.login({
      email: userInfo.email,
      password: null,
      loginType: 'GOOGLE',
    });

    return loginTokens;
  }

  async googleGetAccessToken(
    code: string,
    redirectUri: string,
    clientId: string,
    clientSecret: string,
  ): Promise<string> {
    const googleGetTokenUrl = OAUTH_URIS.GOOGLE.GET_TOKEN;

    const res = await axios.post(googleGetTokenUrl, {
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
    });

    return res.data.access_token;
  }

  async googleGetUserInfo(accessToken: string): Promise<OauthUserInfoDto> {
    const res = await axios.get(OAUTH_URIS.GOOGLE.GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user: OauthUserInfoDto = {
      id: res.data?.sub,
      email: res.data?.email,
      nickname: res.data?.name ?? '',
    };

    return user;
  }
}
