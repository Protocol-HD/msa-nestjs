import { NestFactory } from '@nestjs/core';
import { GATEWAY_OPTIONS } from 'libs/constants/microservice.constant';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(GATEWAY_OPTIONS.API_GATEWAY.port);
}
bootstrap();
