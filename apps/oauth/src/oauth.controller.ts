import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OauthLoginDto } from './dto/oauth-login.dto';
import { KakaoService } from './kakao/kakao.service';
import { NaverService } from './naver/naver.service';

@Controller()
export class OauthController {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly naverService: NaverService,
  ) {}

  @MessagePattern({ cmd: 'kakaoLogin' })
  kakaoLogin(input: OauthLoginDto): any {
    return this.kakaoService.kakaoLogin(input);
  }

  @MessagePattern({ cmd: 'naverLogin' })
  naverLogin(input: OauthLoginDto): any {
    return this.naverService.naverLogin(input);
  }
}
