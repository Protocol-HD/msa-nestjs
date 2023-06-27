import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BoardModule } from './board.module';
import { LoggingInterceptor } from 'libs/interceptors/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BoardModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
