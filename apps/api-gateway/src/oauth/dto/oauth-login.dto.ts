export class OauthLoginDto {
  code: string;
  redirectUri: string;
  clientId: string;
  clientSecret?: string;
}
