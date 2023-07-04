import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'REDIS_CACHE_SERVICE',
        transport: Transport.TCP,
        options: { port: 3004 },
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
