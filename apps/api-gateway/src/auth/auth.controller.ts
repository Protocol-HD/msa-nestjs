import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserGuard } from 'libs/auth/auth.guard';
import { Observable } from 'rxjs';
import { LoginInput } from './dto/login-input.dto';
import { LoginTokens } from './dto/login-tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('/login')
  login(@Body() input: LoginInput): Observable<LoginTokens> {
    return this.authClient.send({ cmd: 'login' }, input);
  }

  @Post('/createAccessToken')
  @UseGuards(UserGuard)
  createAccessToken(
    @Req() req,
    @Body('refreshToken') refreshToken: string,
  ): Observable<LoginTokens> {
    const email = req.user.email;
    return this.authClient.send(
      { cmd: 'createAccessToken' },
      { email, refreshToken },
    );
  }
}
