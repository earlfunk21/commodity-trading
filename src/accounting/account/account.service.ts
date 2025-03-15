import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { FindManyAccountQuery } from './account.dto';

@Injectable({ scope: Scope.REQUEST })
export class AccountService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindManyAccountQuery) {
    const args: Prisma.AccountFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        userId: query.userId,
        ...this.searchQuery(query),
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    };

    return this.prisma.account.findMany(args);
  }

  count(query: FindManyAccountQuery) {
    const args: Prisma.AccountCountArgs = {
      where: {
        userId: query.userId,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.account.count(args);
  }

  private searchQuery(query: FindManyAccountQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Account)[] = ['id'];

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

  findOne(userId: string) {
    return this.prisma.account.findUnique({
      where: {
        userId,
      },
    });
  }
}
