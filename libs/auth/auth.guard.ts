import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('### Jwt Auth Guard ###');

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info && info.message === 'No auth token') {
      throw new HttpException('NO_AUTH_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    if (info && info.name === 'TokenExpiredError') {
      throw new HttpException('TOKEN_EXPIRED', HttpStatus.UNAUTHORIZED);
    }
    if (err || info || !user) {
      throw (
        err ||
        info ||
        new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED)
      );
    }
    return user;
  }
}
