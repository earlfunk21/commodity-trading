import { PrismaService } from '@/common/prisma/prisma.service';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Prisma, TradeTransaction } from '@prisma/client';
import {
  CreateTradeTransactionDto,
  FindManyTradeTransactionQuery,
  UpdateTradeTransactionDto,
} from './trade-transaction.dto';

@Injectable({ scope: Scope.REQUEST })
export class TradeTransactionService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createTradeTransactionDto: CreateTradeTransactionDto) {
    const trades = await this.prisma.trade.findMany({
      where: {
        id: {
          in: createTradeTransactionDto.tradeIds,
        },
      },
    });

    for (const trade of trades) {
      if (trade.mainTokenId !== createTradeTransactionDto.mainTokenId) {
        throw new BadRequestException(
          `Trade ${trade.id} main token ID ${trade.mainTokenId} does not match the requested token ID ${createTradeTransactionDto.mainTokenId}`,
        );
      }
    }

    return this.prisma.tradeTransaction.create({
      data: createTradeTransactionDto,
    });
  }

  findAll(query: FindManyTradeTransactionQuery) {
    const args: Prisma.TradeTransactionFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.tradeTransaction.findMany(args);
  }

  count(query: FindManyTradeTransactionQuery) {
    const args: Prisma.TradeTransactionCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.tradeTransaction.count(args);
  }

  private searchQuery(query: FindManyTradeTransactionQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof TradeTransaction)[] = ['id'];

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
    return this.prisma.tradeTransaction.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTradeTransactionDto: UpdateTradeTransactionDto) {
    return this.prisma.tradeTransaction.update({
      where: {
        id,
      },
      data: updateTradeTransactionDto,
    });
  }

  remove(id: string) {
    return this.prisma.tradeTransaction.delete({
      where: {
        id,
      },
    });
  }
}
