import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoginAuthInput, LoginAuthOutput } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Mutation(() => LoginAuthOutput, { name: 'login' })
  login(@Args('input') input: LoginAuthInput): Observable<LoginAuthOutput> {
    return this.authClient.send({ cmd: 'login' }, input);
  }
}
