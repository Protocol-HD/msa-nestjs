import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { AuthController } from './auth.controller';
import { CreateAccessTokenCommandHandler } from './command/create-access-token-command.handler';
import { LoginCommandHandler } from './command/login-command.handler';
import { LoginEventHandler } from './event/login-event.handler';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: MICROSERVICE_OPTIONS.USER.transport,
        options: MICROSERVICE_OPTIONS.USER.options,
      },
      {
        name: 'REDIS_CACHE_SERVICE',
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
    LoginEventHandler,
  ],
})
export class AuthModule {}
