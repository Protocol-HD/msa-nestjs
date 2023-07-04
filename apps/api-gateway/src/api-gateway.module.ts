import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { JwtStrategy } from 'libs/auth/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_CACHE_SERVICE',
        transport: Transport.TCP,
        options: { port: 3004 },
      },
    ]),
    UserModule,
    AuthModule,
    BoardModule,
  ],
  providers: [JwtStrategy],
})
export class ApiGatewayModule {}
