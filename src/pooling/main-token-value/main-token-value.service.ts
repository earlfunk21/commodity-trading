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
          SUM("unitValue") AS value,
          EXTRACT(MINUTE FROM date_trunc('minute', "createdAt")) AS minute,
          EXTRACT(HOUR FROM date_trunc('hour', "createdAt")) AS hour,
          EXTRACT(DAY FROM date_trunc('day', "createdAt")) AS day,
          EXTRACT(MONTH FROM date_trunc('month', "createdAt")) AS month,
          EXTRACT(YEAR FROM date_trunc('year', "createdAt")) AS year,
          date_trunc('minute', "createdAt") AS date
      FROM
          public."MainTokenValue"
      WHERE
          EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY
          EXTRACT(MINUTE FROM date_trunc('minute', "createdAt")),
          EXTRACT(HOUR FROM date_trunc('hour', "createdAt")),
          EXTRACT(DAY FROM date_trunc('day', "createdAt")),
          EXTRACT(MONTH FROM date_trunc('month', "createdAt")),
          EXTRACT(YEAR FROM date_trunc('year', "createdAt")),
          date_trunc('minute', "createdAt")
      ORDER BY
          date_trunc('minute', "createdAt");
    `;
  }

  tokenValuesByHour() {
    return this.prisma.$queryRaw`
      SELECT
        SUM("unitValue") AS value,
        EXTRACT(HOUR FROM date_trunc('hour', "createdAt")) AS hour,
        EXTRACT(DAY FROM date_trunc('day', "createdAt")) AS day,
        EXTRACT(MONTH FROM date_trunc('month', "createdAt")) AS month,
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")) AS year,
        date_trunc('hour', "createdAt") AS date
      FROM public."MainTokenValue"
      WHERE
        EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY
        EXTRACT(HOUR FROM date_trunc('hour', "createdAt")),
        EXTRACT(DAY FROM date_trunc('day', "createdAt")),
        EXTRACT(MONTH FROM date_trunc('month', "createdAt")),
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")),
        date_trunc('hour', "createdAt")
      ORDER BY
        date_trunc('hour', "createdAt");
    `;
  }

  tokenValuesByDay() {
    return this.prisma.$queryRaw`
      SELECT
        SUM("unitValue") AS value,
        EXTRACT(DAY FROM date_trunc('day', "createdAt")) AS day,
        EXTRACT(MONTH FROM date_trunc('month', "createdAt")) AS month,
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")) AS year,
        date_trunc('day', "createdAt") AS date
      FROM public."MainTokenValue"
      WHERE
        EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY
        EXTRACT(DAY FROM date_trunc('day', "createdAt")),
        EXTRACT(MONTH FROM date_trunc('month', "createdAt")),
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")),
        date_trunc('day', "createdAt")
      ORDER BY
        date_trunc('day', "createdAt");
    `;
  }

  tokenValuesByMonth() {
    return this.prisma.$queryRaw`
      SELECT
        SUM("unitValue") AS value,
        EXTRACT(MONTH FROM date_trunc('month', "createdAt")) AS month,
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")) AS year,
        date_trunc('month', "createdAt") AS date
      FROM public."MainTokenValue"
      GROUP BY
        EXTRACT(MONTH FROM date_trunc('month', "createdAt")),
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")),
        date_trunc('month', "createdAt")
      ORDER BY
        date_trunc('month', "createdAt");
    `;
  }

  tokenValuesByYear() {
    return this.prisma.$queryRaw`
      SELECT
        SUM("unitValue") AS value,
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")) AS year,
        date_trunc('year', "createdAt") AS date
      FROM public."MainTokenValue"
      GROUP BY
        EXTRACT(YEAR FROM date_trunc('year', "createdAt")),
        date_trunc('year', "createdAt")
      ORDER BY
        date_trunc('year', "createdAt");
    `;
  }
}
