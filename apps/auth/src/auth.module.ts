import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { AuthController } from './auth.controller';
import { CreateAccessTokenCommandHandler } from './command/create-access-token-command.handler';
import { LoginCommandHandler } from './command/login-command.handler';
import { LoggedInEventHandler } from './event/logged-in-event.handler';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.USER.name,
        transport: MICROSERVICE_OPTIONS.USER.transport,
        options: MICROSERVICE_OPTIONS.USER.options,
      },
      {
        name: MICROSERVICE_OPTIONS.REDIS_CACHE.name,
        transport: MICROSERVICE_OPTIONS.REDIS_CACHE.transport,
        options: MICROSERVICE_OPTIONS.REDIS_CACHE.options,
      },
    ]),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginCommandHandler,
    CreateAccessTokenCommandHandler,
    LoggedInEventHandler,
  ],
})
export class AuthModule {}
