import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthInput, LoginAuthOutput } from 'apps/auth/src/dto/auth.dto';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() input: LoginAuthInput): Observable<LoginAuthOutput> {
    return this.authService.login(input);
  }
}
