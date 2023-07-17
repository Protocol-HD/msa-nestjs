import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OauthLoginDto } from './dto/oauth-login.dto';
import { GoogleService } from './google/google.service';
import { KakaoService } from './kakao/kakao.service';
import { NaverService } from './naver/naver.service';
import { TwitterService } from './twitter/twitter.service';

@Controller()
export class OauthController {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly naverService: NaverService,
    private readonly googleService: GoogleService,
    private readonly twitterService: TwitterService,
  ) {}

  @MessagePattern({ cmd: 'kakaoLogin' })
  kakaoLogin(input: OauthLoginDto): any {
    return this.kakaoService.kakaoLogin(input);
  }

  @MessagePattern({ cmd: 'naverLogin' })
  naverLogin(input: OauthLoginDto): any {
    return this.naverService.naverLogin(input);
  }

  @MessagePattern({ cmd: 'googleLogin' })
  googleLogin(input: OauthLoginDto): any {
    return this.googleService.googleLogin(input);
  }

  @MessagePattern({ cmd: 'twitterLogin' })
  twitterLogin(input: OauthLoginDto): any {
    return this.twitterService.twitterLogin(input);
  }
}
