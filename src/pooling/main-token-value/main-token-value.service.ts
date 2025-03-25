import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { MainTokenValue, Prisma } from '@prisma/client';
import {
  CreateMainTokenValueDto,
  FindManyMainTokenValueQuery,
} from './main-token-value.dto';

@Injectable({ scope: Scope.REQUEST })
export class MainTokenValueService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createMainTokenValueDto: CreateMainTokenValueDto) {
    const mainToken = await this.prisma.mainToken.findUniqueOrThrow({
      where: {
        id: createMainTokenValueDto.mainTokenId,
      },
      select: {
        currentTokenValueId: true,
        currentTokenValue: {
          select: {
            totalValue: true,
            unitValue: true,
            soldTokens: true,
          },
        },
      },
    });

    if (!!mainToken.currentTokenValue) {
      const { unitValue, soldTokens, totalValue } = mainToken.currentTokenValue;

      const totalPurchasedAmount = unitValue * soldTokens;
      createMainTokenValueDto.totalValue = totalValue - totalPurchasedAmount;
      createMainTokenValueDto.volume =
        createMainTokenValueDto.totalValue / createMainTokenValueDto.unitValue;
    }

    return this.prisma.transaction(async (tx) => {
      const mainTokenValue = await tx.mainTokenValue.create({
        data: createMainTokenValueDto,
      });

      await tx.mainToken.update({
        where: {
          id: createMainTokenValueDto.mainTokenId,
        },
        data: {
          currentTokenValueId: mainTokenValue.id,
          lastTokenValueId: mainToken.currentTokenValueId,
        },
      });

      return mainTokenValue;
    });
  }

  findAll(query: FindManyMainTokenValueQuery) {
    const args: Prisma.MainTokenValueFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.mainTokenValue.findMany(args);
  }

  count(query: FindManyMainTokenValueQuery) {
    const args: Prisma.MainTokenValueCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.mainTokenValue.count(args);
  }

  private searchQuery(query: FindManyMainTokenValueQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof MainTokenValue)[] = ['id'];

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

  findOne(id: string) {
    return this.prisma.mainTokenValue.findUnique({
      where: {
        id,
      },
    });
  }

  tokenValuesByMinute() {
    return this.prisma.$queryRaw`
      SELECT
        SUM(MAINTOKENVALUE."unitValue") AS TOTAL,
        EXTRACT(MINUTE FROM MAINTOKENVALUE."createdAt") AS MINUTE,
        EXTRACT(HOUR FROM MAINTOKENVALUE."createdAt") AS HOUR,
        EXTRACT(DAY FROM MAINTOKENVALUE."createdAt") AS DAY,
        EXTRACT(MONTH FROM MAINTOKENVALUE."createdAt") AS MONTH,
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") AS YEAR
      FROM PUBLIC."MainTokenValue" AS MAINTOKENVALUE
      WHERE
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY MINUTE, HOUR, DAY, MONTH, YEAR
      ORDER BY YEAR, MONTH, DAY, HOUR, MINUTE
    `;
  }

  tokenValuesByHour() {
    return this.prisma.$queryRaw`
      SELECT
        SUM(MAINTOKENVALUE."unitValue") AS TOTAL,
        EXTRACT(HOUR FROM MAINTOKENVALUE."createdAt") AS HOUR,
        EXTRACT(DAY FROM MAINTOKENVALUE."createdAt") AS DAY,
        EXTRACT(MONTH FROM MAINTOKENVALUE."createdAt") AS MONTH,
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") AS YEAR
      FROM PUBLIC."MainTokenValue" AS MAINTOKENVALUE
      WHERE
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY HOUR, DAY, MONTH, YEAR
      ORDER BY YEAR, MONTH, DAY, HOUR
    `;
  }

  tokenValuesByDay() {
    return this.prisma.$queryRaw`
      SELECT
        SUM(MAINTOKENVALUE."unitValue") AS TOTAL,
        EXTRACT(DAY FROM MAINTOKENVALUE."createdAt") AS DAY,
        EXTRACT(MONTH FROM MAINTOKENVALUE."createdAt") AS MONTH,
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") AS YEAR
      FROM PUBLIC."MainTokenValue" AS MAINTOKENVALUE
      WHERE
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY DAY, MONTH, YEAR
      ORDER BY YEAR, MONTH, DAY
    `;
  }

  tokenValuesByMonth() {
    return this.prisma.$queryRaw`
      SELECT
        SUM(MAINTOKENVALUE."unitValue") AS TOTAL,
        EXTRACT(MONTH FROM MAINTOKENVALUE."createdAt") AS MONTH,
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") AS YEAR
      FROM PUBLIC."MainTokenValue" AS MAINTOKENVALUE
      GROUP BY MONTH, YEAR
      ORDER BY YEAR, MONTH
    `;
  }

  tokenValuesByYear() {
    return this.prisma.$queryRaw`
      SELECT
        SUM(MAINTOKENVALUE."unitValue") AS TOTAL,
        EXTRACT(YEAR FROM MAINTOKENVALUE."createdAt") AS YEAR
      FROM PUBLIC."MainTokenValue" AS MAINTOKENVALUE
      GROUP BY YEAR
      ORDER BY YEAR
    `;
  }
}
