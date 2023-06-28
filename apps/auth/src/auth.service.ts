import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { firstValueFrom } from 'rxjs';
import { LoginAuthInput, LoginAuthOutput } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginInput: LoginAuthInput,
  ): Promise<LoginAuthOutput | HttpException> {
    const observableData = this.userClient.send(
      { cmd: 'getUser' },
      loginInput.email,
    );

    const user: UserEntity = await firstValueFrom(observableData);

    if (!user) {
      return new HttpException('NOT_EXIST_EMAIL', HttpStatus.NOT_FOUND);
    }

    const isCorrectPassword = await argon2.verify(
      user.password,
      loginInput.password,
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
