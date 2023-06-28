import { Controller, HttpException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginAuthInput, LoginAuthOutput } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  login(input: LoginAuthInput): Promise<LoginAuthOutput | HttpException> {
    return this.authService.login(input);
  }
}
