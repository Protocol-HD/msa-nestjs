import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
