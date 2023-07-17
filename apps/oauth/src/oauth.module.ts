import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { GoogleLoggedInEventHandler } from './event/google-logged-in-event.handler';
import { KakaoLoggedInEventHandler } from './event/kakao-logged-in-event.handler';
import { NaverLoggedInEventHandler } from './event/naver-logged-in-event.handler';
import { TwitterLoggedInEventHandler } from './event/twitter-logged-in-event.handler';
import { GoogleService } from './google/google.service';
import { KakaoService } from './kakao/kakao.service';
import { NaverService } from './naver/naver.service';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { TwitterService } from './twitter/twitter.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.USER.name,
        transport: MICROSERVICE_OPTIONS.USER.transport,
        options: MICROSERVICE_OPTIONS.USER.options,
      },
      {
        name: MICROSERVICE_OPTIONS.AUTH.name,
        transport: MICROSERVICE_OPTIONS.AUTH.transport,
        options: MICROSERVICE_OPTIONS.AUTH.options,
      },
    ]),
    CqrsModule,
    KakaoLoggedInEventHandler,
    NaverLoggedInEventHandler,
    GoogleLoggedInEventHandler,
    TwitterLoggedInEventHandler,
  ],
  controllers: [OauthController],
  providers: [
    OauthService,
    KakaoService,
    NaverService,
    GoogleService,
    TwitterService,
  ],
})
export class OauthModule {}
