import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from 'libs/interceptors/logging.interceptor';
import { GraphqlGatewayModule } from './graphql-gateway.module';
import { RestErrorInterceptor } from 'libs/interceptors/rest-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  app.useGlobalInterceptors(new RestErrorInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(4000);
}
bootstrap();
