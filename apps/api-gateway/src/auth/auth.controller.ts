import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginAuthInput, LoginAuthOutput } from 'apps/auth/src/dto/auth.dto';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('/login')
  login(@Body() input: LoginAuthInput): Observable<LoginAuthOutput> {
    return this.authClient.send({ cmd: 'login' }, input);
  }
}
