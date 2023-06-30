import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as argon2 from 'argon2';
import { User } from 'prisma/generated/UserClient';
import { firstValueFrom } from 'rxjs';
import { LoginAuthInput, LoginAuthOutput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginAuthInput): Promise<LoginAuthOutput | HttpException> {
    const observableData = this.userClient.send(
      { cmd: 'getUser' },
      input.email,
    );

    const user: User = await firstValueFrom(observableData);

    if (!user) {
      return new HttpException('NOT_EXIST_EMAIL', HttpStatus.NOT_FOUND);
    }

    const isCorrectPassword = await argon2.verify(
      user.password,
      input.password,
    );

    if (!isCorrectPassword) {
      return new HttpException('INVALID_PASSWORD', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: user.email, role: user.role, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
