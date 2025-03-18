import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { AllocationAccountTransaction, Prisma } from '@prisma/client';
import { FindManyAllocationAccountTransactionQuery } from './allocation-account-transaction.dto';

@Injectable({ scope: Scope.REQUEST })
export class AllocationAccountTransactionService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindManyAllocationAccountTransactionQuery) {
    const args: Prisma.AllocationAccountTransactionFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        allocation: query.allocation,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.allocationAccountTransaction.findMany(args);
  }

  count(query: FindManyAllocationAccountTransactionQuery) {
    const args: Prisma.AllocationAccountTransactionCountArgs = {
      where: {
        allocation: query.allocation,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.allocationAccountTransaction.count(args);
  }

  private searchQuery(query: FindManyAllocationAccountTransactionQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof AllocationAccountTransaction)[] = ['id'];

    return {
      OR: [
        ...searchFields.map((field) => ({
          [field]: {
            search: query.search,
          },
        })),
      ],
    };
  }
}
