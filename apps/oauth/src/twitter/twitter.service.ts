import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import axios from 'axios';
import { OAUTH_URIS } from 'libs/constants/oauth.constant';
import * as uuid from 'uuid';
import { LoginTokens } from '../dto/login-tokens.dto';
import { OauthLoginDto } from '../dto/oauth-login.dto';
import { OauthUserInfoDto } from '../dto/oauth-user-info.dto';
import { TwitterLoggedInEvent } from '../event/twitter-logged-in.event';
import { OauthService } from '../oauth.service';

@Injectable()
export class TwitterService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly oauthService: OauthService,
  ) {}

  async twitterLogin(input: OauthLoginDto): Promise<LoginTokens> {
    const { code, redirectUri, clientId } = input;

    // 트위터 로그인을 통해 받은 code를 이용해 access token을 받아온다.
    const accessToken = await this.twitterGetAccessToken(
      code,
      redirectUri,
      clientId,
    );
    // access token을 이용해 트위터 유저 정보를 받아온다.
    const userInfo = await this.twitterGetUserInfo(accessToken);

    // 트위터 유저 정보를 이용해 트위터 로그인 이벤트를 발행한다.
    this.eventBus.publish(new TwitterLoggedInEvent(accessToken));

    // 트위터 이메일을 이용해 회원가입 여부를 확인한다.
    const isSignedUp = await this.oauthService.checkEmail(userInfo.email);

    // 회원가입이 되어있지 않다면 회원가입을 진행한다.
    if (!isSignedUp) {
      await this.oauthService.signUp({
        email: userInfo.email,
        password: uuid.v4(),
        name: userInfo.nickname,
        role: 1,
        loginType: 'TWITTER',
      });
    }

    // 트위터 로그인을 통해 로그인을 진행한다.
    const loginTokens = await this.oauthService.login({
      email: userInfo.email,
      password: null,
      loginType: 'TWITTER',
    });

    return loginTokens;
  }

  async twitterGetAccessToken(
    code: string,
    redirectUri: string,
    clientId: string,
  ): Promise<string> {
    const twitterGetTokenUrl = OAUTH_URIS.TWITTER.GET_TOKEN;

    const res = await axios.post(
      twitterGetTokenUrl,
      new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        grant_type: 'authorization_code',
        code_verifier: 'challenge',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log(res);

    return res.data.access_token;
  }

  async twitterGetUserInfo(accessToken: string): Promise<OauthUserInfoDto> {
    const res = await axios.get(OAUTH_URIS.TWITTER.GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res);

    const user: OauthUserInfoDto = {
      id: res.data?.data?.id,
      email: res.data?.data?.email ?? res.data?.data?.id, // 트위터 OAuth에서는 이메일을 제공하지 않는다.
      nickname: res.data?.data?.username,
    };

    return user;
  }
}
