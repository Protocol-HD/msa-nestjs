import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import axios from 'axios';
import { OAUTH_URIS } from 'libs/constants/oauth.constant';
import * as uuid from 'uuid';
import { LoginTokens } from '../dto/login-tokens.dto';
import { OauthLoginDto } from '../dto/oauth-login.dto';
import { OauthUserInfoDto } from '../dto/oauth-user-info.dto';
import { KakaoLoggedInEvent } from '../event/kakao-logged-in.event';
import { OauthService } from '../oauth.service';

@Injectable()
export class KakaoService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly oauthService: OauthService,
  ) {}

  async kakaoLogin(input: OauthLoginDto): Promise<LoginTokens> {
    const { code, redirectUri, clientId } = input;

    // 카카오 로그인을 통해 받은 code를 이용해 access token을 받아온다.
    const accessToken = await this.kakaoGetAccessToken(
      code,
      redirectUri,
      clientId,
    );
    // access token을 이용해 카카오 유저 정보를 받아온다.
    const userInfo = await this.kakaoGetUserInfo(accessToken);

    // 카카오 유저 정보를 이용해 카카오 로그인 이벤트를 발행한다.
    this.eventBus.publish(new KakaoLoggedInEvent(accessToken));

    // 카카오 이메일을 이용해 회원가입 여부를 확인한다.
    const isSignedUp = await this.oauthService.checkEmail(userInfo.email);

    // 회원가입이 되어있지 않다면 회원가입을 진행한다.
    if (!isSignedUp) {
      await this.oauthService.signUp({
        email: userInfo.email,
        password: uuid.v4(),
        name: userInfo.nickname,
        role: 1,
        loginType: 'KAKAO',
      });
    }

    // 카카오 로그인을 통해 로그인을 진행한다.
    const loginTokens = await this.oauthService.login({
      email: userInfo.email,
      password: null,
      loginType: 'KAKAO',
    });

    return loginTokens;
  }

  async kakaoGetAccessToken(
    code: string,
    redirectUri: string,
    clientId: string,
  ): Promise<string> {
    const kakaoGetTokenUrl =
      OAUTH_URIS.KAKAO.GET_TOKEN +
      `&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}`;

    const res = await axios.post(kakaoGetTokenUrl);

    return res.data.access_token;
  }

  async kakaoGetUserInfo(accessToken: string): Promise<OauthUserInfoDto> {
    const res = await axios.get(OAUTH_URIS.KAKAO.GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user: OauthUserInfoDto = {
      id: res.data?.id,
      email: res.data?.kakao_account?.email,
      nickname: res.data?.properties?.nickname,
    };

    return user;
  }
}
