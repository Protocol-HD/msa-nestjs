import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginAuthInput, LoginAuthOutput } from 'apps/auth/src/dto/auth.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  login(input: LoginAuthInput): Observable<LoginAuthOutput> {
    return this.authClient.send({ cmd: 'login' }, input);
  }
}
