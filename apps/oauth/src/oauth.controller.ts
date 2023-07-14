import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { KakaoService } from './kakao/kakao.service';

@Controller()
export class OauthController {
  constructor(private readonly kakaoService: KakaoService) {}

  @MessagePattern({ cmd: 'kakaoLogin' })
  kakaoLogin(input: KakaoLoginDto): any {
    return this.kakaoService.kakaoLogin(input);
  }
}
