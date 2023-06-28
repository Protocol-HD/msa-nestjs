import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UserModule, AuthModule, BoardModule],
})
export class ApiGatewayModule {}
