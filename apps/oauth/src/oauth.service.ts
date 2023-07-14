import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_OPTIONS } from 'libs/constants/microservice.constant';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginInput } from './dto/login-input.dto';
import { LoginTokens } from './dto/login-tokens.dto';

@Injectable()
export class OauthService {
  constructor(
    @Inject(MICROSERVICE_OPTIONS.USER.name)
    private readonly userClient: ClientProxy,
    @Inject(MICROSERVICE_OPTIONS.AUTH.name)
    private readonly authClient: ClientProxy,
  ) {}
  async checkEmail(email: string): Promise<boolean> {
    const observable = this.userClient.send({ cmd: 'getUser' }, email);
    const user = await firstValueFrom(observable);

    return !!user;
  }

  async signUp(input: CreateUserDto): Promise<void> {
    const observable = this.userClient.send({ cmd: 'createUser' }, input);
    const user = await firstValueFrom(observable);

    console.log(user);
    return;
  }

  async login(input: LoginInput): Promise<LoginTokens> {
    const observable = this.authClient.send({ cmd: 'login' }, input);
    const loginTokens = await firstValueFrom(observable);

    return loginTokens;
  }
}
