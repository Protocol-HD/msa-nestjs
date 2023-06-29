import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoginAuthInput, LoginAuthOutput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  login(input: LoginAuthInput): Observable<LoginAuthOutput> {
    return this.authClient.send({ cmd: 'login' }, input);
  }
}
