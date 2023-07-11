import { Injectable } from '@nestjs/common';
import { PrismaRepository } from 'libs/repositories/prisma.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class BoardRepository extends PrismaRepository<PrismaService> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'board');
  }
}
