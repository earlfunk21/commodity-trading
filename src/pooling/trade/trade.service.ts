import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Prisma, Trade } from '@prisma/client';
import {
  CreateTradeDto,
  FindManyTradeQuery,
  UpdateTradeDto,
} from './trade.dto';

@Injectable({ scope: Scope.REQUEST })
export class TradeService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createTradeDto: CreateTradeDto) {
    return this.prisma.trade.create({
      data: createTradeDto,
    });
  }

  findAll(query: FindManyTradeQuery) {
    const args: Prisma.TradeFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.trade.findMany(args);
  }

  count(query: FindManyTradeQuery) {
    const args: Prisma.TradeCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.trade.count(args);
  }

  private searchQuery(query: FindManyTradeQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Trade)[] = ['id'];

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
    return this.prisma.trade.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTradeDto: UpdateTradeDto) {
    return this.prisma.trade.update({
      where: {
        id,
      },
      data: updateTradeDto,
    });
  }

  remove(id: string) {
    return this.prisma.trade.delete({
      where: {
        id,
      },
    });
  }

  graphByMainToken(mainTokenId: string) {
    return this.prisma.$queryRaw`
      SELECT 
        SUM(trade."tokenValue") AS total, 
        EXTRACT(MONTH FROM trade."createdAt") AS month,
        EXTRACT(YEAR FROM trade."createdAt") AS year
      FROM 
        public."Trade" AS trade
      WHERE 
        EXTRACT(YEAR FROM trade."createdAt") = EXTRACT(YEAR FROM NOW()) 
        AND trade."mainTokenId" = ${mainTokenId}
      GROUP BY 
        EXTRACT(MONTH FROM trade."createdAt"), EXTRACT(YEAR FROM trade."createdAt")
      ORDER BY 
        EXTRACT(MONTH FROM trade."createdAt");
    `;
  }
}
