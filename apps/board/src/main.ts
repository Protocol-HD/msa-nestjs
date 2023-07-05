import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { BoardModule } from './board.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BoardModule,
    {
      transport: MICROSERVICE_OPTIONS.BOARD.transport,
      options: MICROSERVICE_OPTIONS.BOARD.options,
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
