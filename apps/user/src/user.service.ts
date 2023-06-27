import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(): string {
    console.log('getUser() called');
    return 'user';
  }
}
