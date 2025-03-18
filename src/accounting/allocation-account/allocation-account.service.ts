import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AllocationAccountService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.allocationAccount.findMany();
  }
}
