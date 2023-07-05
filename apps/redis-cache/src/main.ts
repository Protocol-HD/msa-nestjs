import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { RedisCacheModule } from './redis-cache.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RedisCacheModule,
    {
      transport: MICROSERVICE_OPTIONS.REDIS_CACHE.transport,
      options: MICROSERVICE_OPTIONS.REDIS_CACHE.options,
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
