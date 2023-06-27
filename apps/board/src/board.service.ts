import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getBoard(): string {
    return 'This is the board service!';
  }
}
