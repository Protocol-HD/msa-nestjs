import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { RedisCacheModule } from './redis-cache.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RedisCacheModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3004,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
}
bootstrap();
