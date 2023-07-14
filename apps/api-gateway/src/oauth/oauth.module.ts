import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { OauthController } from './oauth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.OAUTH.name,
        transport: MICROSERVICE_OPTIONS.OAUTH.transport,
        options: MICROSERVICE_OPTIONS.OAUTH.options,
      },
    ]),
  ],
  controllers: [OauthController],
})
export class OauthModule {}
