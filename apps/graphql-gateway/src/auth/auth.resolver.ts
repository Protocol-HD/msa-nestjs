import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthInput, LoginAuthOutput } from './dto/auth.dto';
import { Observable } from 'rxjs';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginAuthOutput, { name: 'login' })
  login(@Args('input') input: LoginAuthInput): Observable<LoginAuthOutput> {
    return this.authService.login(input);
  }
}
