import { NestFactory } from '@nestjs/core';
import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  await app.listen(4000);
}
bootstrap();
