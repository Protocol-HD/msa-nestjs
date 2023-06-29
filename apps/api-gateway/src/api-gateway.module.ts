import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { JwtStrategy } from 'libs/auth/jwt.strategy';

@Module({
  imports: [UserModule, AuthModule, BoardModule],
  providers: [JwtStrategy],
})
export class ApiGatewayModule {}
