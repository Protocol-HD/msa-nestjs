import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import axios from 'axios';
import { OAUTH_URIS } from 'libs/constants/oauth.constant';
import * as uuid from 'uuid';
import { LoginTokens } from '../dto/login-tokens.dto';
import { OauthLoginDto } from '../dto/oauth-login.dto';
import { OauthUserInfoDto } from '../dto/oauth-user-info.dto';
import { NaverLoggedInEvent } from '../event/naver-logged-in.event';
import { OauthService } from '../oauth.service';

@Injectable()
export class NaverService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly oauthService: OauthService,
  ) {}

  async naverLogin(input: OauthLoginDto): Promise<LoginTokens> {
    const { code, redirectUri, clientId, clientSecret } = input;

    // 네이버 로그인을 통해 받은 code를 이용해 access token을 받아온다.
    const accessToken = await this.naverGetAccessToken(
      code,
      redirectUri,
      clientId,
      clientSecret,
    );

    // access token을 이용해 네이버 유저 정보를 받아온다.
    const userInfo = await this.naverGetUserInfo(accessToken);

    //네이버 유저 정보를 이용해 네이버 로그인 이벤트를 발행한다.
    this.eventBus.publish(new NaverLoggedInEvent(accessToken));

    // 네이버 이메일을 이용해 회원가입 여부를 확인한다.
    const isSignedUp = await this.oauthService.checkEmail(userInfo.email);

    // 회원가입이 되어있지 않다면 회원가입을 진행한다.
    if (!isSignedUp) {
      await this.oauthService.signUp({
        email: userInfo.email,
        password: uuid.v4(),
        name: userInfo.nickname,
        role: 1,
        loginType: 'NAVER',
      });
    }

    // 네이버 로그인을 통해 로그인을 진행한다.
    const loginTokens = await this.oauthService.login({
      email: userInfo.email,
      password: null,
      loginType: 'NAVER',
    });

    return loginTokens;
  }

  async naverGetAccessToken(
    code: string,
    redirectUri: string,
    clientId: string,
    clientSecret: string,
  ): Promise<string> {
    const naverGetTokenUrl =
      OAUTH_URIS.NAVER.GET_TOKEN +
      `&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`;
    console.log(naverGetTokenUrl);

    const res = await axios.get(naverGetTokenUrl);

    return res.data.access_token;
  }

  async naverGetUserInfo(accessToken: string): Promise<OauthUserInfoDto> {
    const res = await axios.get(OAUTH_URIS.NAVER.GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user: OauthUserInfoDto = {
      id: res.data?.response?.id,
      email: res.data?.response?.email,
      nickname: res.data?.response?.nickname,
    };

    return user;
  }
}
