import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
