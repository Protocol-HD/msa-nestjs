import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggingInterceptor } from 'libs/interceptors/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3003,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
