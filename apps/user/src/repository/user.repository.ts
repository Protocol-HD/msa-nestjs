import { Injectable } from '@nestjs/common';
import { PrismaRepository } from 'libs/repository/prisma.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserRepository extends PrismaRepository<PrismaService> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }
}
