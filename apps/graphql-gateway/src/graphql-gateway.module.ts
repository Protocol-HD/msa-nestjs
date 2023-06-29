import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtStrategy } from 'libs/auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class GraphqlGatewayModule {}
