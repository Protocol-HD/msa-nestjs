import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { KakaoLoggedInEventHandler } from './event/kakao-logged-in-event.handler';
import { KakaoService } from './kakao/kakao.service';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

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
  ],
  controllers: [OauthController],
  providers: [OauthService, KakaoService],
})
export class OauthModule {}
