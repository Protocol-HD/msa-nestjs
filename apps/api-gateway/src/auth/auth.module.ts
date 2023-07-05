import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: MICROSERVICE_OPTIONS.AUTH.transport,
        options: MICROSERVICE_OPTIONS.AUTH.options,
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
