import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserQuery): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email: query.email } });
  }
}
