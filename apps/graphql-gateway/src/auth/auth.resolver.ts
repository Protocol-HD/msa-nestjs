import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { UserGuardGQL } from 'libs/auth/auth.guard';
import { Observable } from 'rxjs';
import { LoginInput } from './dto/login-input.dto';
import { LoginTokens } from './dto/login-tokens.dto';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Mutation(() => LoginTokens, { name: 'login' })
  login(@Args('input') input: LoginInput): Observable<LoginTokens> {
    return this.authClient.send({ cmd: 'login' }, input);
  }

  @Mutation(() => LoginTokens, { name: 'createAccessToken' })
  @UseGuards(UserGuardGQL)
  createAccessToken(
    @Context() context,
    @Args('refreshToken') refreshToken: string,
  ): Observable<LoginTokens> {
    const email = context.req.user.email;
    return this.authClient.send(
      { cmd: 'createAccessToken' },
      { email, refreshToken },
    );
  }
}
