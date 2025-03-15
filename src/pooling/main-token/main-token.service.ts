import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { MainToken, Prisma } from '@prisma/client';
import {
  CreateMainTokenDto,
  FindManyMainTokenQuery,
  UpdateMainTokenDto,
} from './main-token.dto';

@Injectable({ scope: Scope.REQUEST })
export class MainTokenService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createMainTokenDto: CreateMainTokenDto) {
    createMainTokenDto.lastValue = createMainTokenDto.unitValue;
    createMainTokenDto.currentValue = createMainTokenDto.unitValue;
    createMainTokenDto.quantity =
      createMainTokenDto.totalValue / createMainTokenDto.unitValue;
    createMainTokenDto.totalTokens =
      createMainTokenDto.totalValue / createMainTokenDto.unitValue;
    return this.prisma.mainToken.create({
      data: createMainTokenDto,
    });
  }

  async findAll(query: FindManyMainTokenQuery) {
    const args: Prisma.MainTokenFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...(!!query.holderId && {
          subTokens: {
            some: {
              holderId: query.holderId,
            },
          },
        }),
        commodityId: query.commodityId,
        commodityTypeId: query.commodityTypeId,
        ...this.searchQuery(query),
      },
      include: {
        commodity: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        commodityType: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            subTokens: true,
          },
        },
      },
    };

    const mainTokens = await this.prisma.mainToken.findMany(args);

    return Promise.all(
      mainTokens.map(async (mainToken) => {
        const unitValue = mainToken.unitValue || 0;
        const lastValue = mainToken.lastValue || 0;
        const usedTokens = mainToken.usedTokens || 0;
        const totalTokens = mainToken.totalTokens || 0;
        const change = ((unitValue - lastValue) / lastValue) * 100;
        const volume = totalTokens - usedTokens;
        const holderCount = await this.prisma.subToken.groupBy({
          by: ['holderId'],
        });
        return {
          ...mainToken,
          last: lastValue,
          change,
          volume,
          holderCount,
        };
      }),
    );
  }

  count(query: FindManyMainTokenQuery) {
    const args: Prisma.MainTokenCountArgs = {
      where: {
        ...(!!query.holderId && {
          subTokens: {
            some: {
              holderId: query.holderId,
            },
          },
        }),
        commodityId: query.commodityId,
        commodityTypeId: query.commodityTypeId,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.mainToken.count(args);
  }

  private searchQuery(query: FindManyMainTokenQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof MainToken)[] = ['id'];

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

  async findOne(code: string) {
    const mainToken = await this.prisma.mainToken.findUniqueOrThrow({
      where: {
        code,
      },
      include: {
        commodity: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        commodityType: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            subTokens: true,
          },
        },
      },
    });

    const unitValue = mainToken.unitValue || 0;
    const lastValue = mainToken.lastValue || 0;
    const usedTokens = mainToken.usedTokens || 0;
    const totalTokens = mainToken.totalTokens || 0;
    const change = ((unitValue - lastValue) / lastValue) * 100;
    const volume = totalTokens - usedTokens;
    const holderCount = await this.prisma.subToken.groupBy({
      by: ['holderId'],
    });
    return {
      ...mainToken,
      last: lastValue,
      change,
      volume,
      holderCount,
    };
  }

  update(id: string, updateMainTokenDto: UpdateMainTokenDto) {
    return this.prisma.mainToken.update({
      where: {
        id,
      },
      data: updateMainTokenDto,
    });
  }

  remove(id: string) {
    return this.prisma.mainToken.delete({
      where: {
        id,
      },
    });
  }
}
