import { NestFactory } from '@nestjs/core';
import { GATEWAY_OPTIONS } from 'libs/constants/microservice.constant';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { RestErrorInterceptor } from 'libs/interceptors/rest-error.interceptor';
import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  // 하이브리드 앱 설정
  app.connectMicroservice({
    transport: GATEWAY_OPTIONS.GRAPHQL_GATEWAY.transport,
    options: GATEWAY_OPTIONS.GRAPHQL_GATEWAY.options,
  });
  app.useGlobalInterceptors(new RestErrorInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.startAllMicroservices();
  await app.listen(GATEWAY_OPTIONS.GRAPHQL_GATEWAY.APP_PORT);
}
bootstrap();
