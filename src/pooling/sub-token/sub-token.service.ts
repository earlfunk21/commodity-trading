import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Prisma, SubToken } from '@prisma/client';
import { FindManySubTokenQuery } from './sub-token.dto';

@Injectable({ scope: Scope.REQUEST })
export class SubTokenService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  findAll(query: FindManySubTokenQuery) {
    const args: Prisma.SubTokenFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        holderId: query.holderId,
        ...this.searchQuery(query),
      },
      include: {
        mainToken: {
          select: {
            id: true,
            code: true,
          },
        },
      },
    };

    return this.prisma.subToken.findMany(args);
  }

  count(query: FindManySubTokenQuery) {
    const args: Prisma.SubTokenCountArgs = {
      where: {
        holderId: query.holderId,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.subToken.count(args);
  }

  private searchQuery(query: FindManySubTokenQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof SubToken)[] = ['id'];

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
