import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  providers: [AuthResolver],
})
export class AuthModule {}
