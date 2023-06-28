export class LoginAuthInput {
  email: string;
  password: string;
}

export class LoginAuthOutput {
  accessToken: string;
  refreshToken: string;
}
