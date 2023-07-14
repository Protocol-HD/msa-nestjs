import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { OauthModule } from './oauth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OauthModule,
    {
      transport: MICROSERVICE_OPTIONS.OAUTH.transport,
      options: MICROSERVICE_OPTIONS.OAUTH.options,
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
