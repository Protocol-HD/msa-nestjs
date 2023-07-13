import { NestFactory } from '@nestjs/core';
import { GATEWAY_OPTIONS } from 'libs/constants/microservice.constant';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { RestErrorInterceptor } from 'libs/interceptors/rest-error.interceptor';
import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  app.useGlobalInterceptors(new RestErrorInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(GATEWAY_OPTIONS.GRAPHQL_GATEWAY.port);
}
bootstrap();
