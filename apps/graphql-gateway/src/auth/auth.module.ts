import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_OPTIONS.AUTH.name,
        transport: MICROSERVICE_OPTIONS.AUTH.transport,
        options: MICROSERVICE_OPTIONS.AUTH.options,
      },
    ]),
  ],
  providers: [AuthResolver],
})
export class AuthModule {}
