import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from 'libs/entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user' })
  async getUser(id: string): Promise<UserEntity> {
    return await this.userService.getUser(id);
  }
}
