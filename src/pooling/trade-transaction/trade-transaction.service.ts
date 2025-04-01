import { PrismaService } from '@/common/prisma/prisma.service';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import {
  AccountTransactionType,
  Allocation,
  Complan,
  Prisma,
  SubToken,
  SubTokenStatus,
  TradeTransaction,
} from '@prisma/client';
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
    const [trades, tradeTotals, subTokens] = await Promise.all([
      this.prisma.trade.findMany({
        where: {
          id: {
            in: createTradeTransactionDto.tradeIds,
          },
        },
      }),
      this.prisma.trade.aggregate({
        where: {
          id: {
            in: createTradeTransactionDto.tradeIds,
          },
        },
        _sum: {
          grossSales: true,
          quantity: true,
        },
      }),
      this.prisma.subToken.findMany({
        where: {
          mainTokenId: createTradeTransactionDto.mainTokenId,
          status: SubTokenStatus.Active,
        },
        select: {
          id: true,
          tokens: true,
          holderId: true,
        },
      }),
    ]);

    for (const trade of trades) {
      if (trade.mainTokenId !== createTradeTransactionDto.mainTokenId) {
        throw new BadRequestException(
          `Trade ${trade.id} main token ID ${trade.mainTokenId} does not match the requested token ID ${createTradeTransactionDto.mainTokenId}`,
        );
      }
    }

    const totalUnitQuantity = tradeTotals._sum.quantity;

    if (!totalUnitQuantity) {
      throw new BadRequestException(`No unit quantity found`);
    }

    const totalGrossSales = tradeTotals._sum.grossSales;

    if (!totalGrossSales) {
      throw new BadRequestException(`No gross sales found`);
    }

    const complan = await this.prisma.complan.findUniqueOrThrow({
      where: {
        id: createTradeTransactionDto.complanId,
      },
    });

    createTradeTransactionDto.totalUnitQuantity = totalUnitQuantity;
    createTradeTransactionDto.totalGrossSales = totalGrossSales;
    createTradeTransactionDto.managementFee = this.calculateManagementFee(
      totalGrossSales,
      complan,
    );
    createTradeTransactionDto.capital = this.calculateCapital(
      totalGrossSales,
      complan,
    );
    createTradeTransactionDto.grossIncome = this.calculateGrossIncome(
      totalGrossSales,
      createTradeTransactionDto.managementFee,
      createTradeTransactionDto.capital,
    );
    createTradeTransactionDto.tax = this.calculateTax(
      createTradeTransactionDto.grossIncome,
      complan,
    );
    createTradeTransactionDto.netIncome = this.calculateNetIncome(
      createTradeTransactionDto.grossIncome,
      createTradeTransactionDto.tax,
    );
    createTradeTransactionDto.tokenValue = this.calculateTokenValue(
      createTradeTransactionDto.netIncome,
      totalUnitQuantity,
    );

    return this.prisma.transaction(async (tx) => {
      const { tradeIds, ...tradeTransactionInput } = createTradeTransactionDto
      const tradeTransaction = await tx.tradeTransaction.create({
        data: tradeTransactionInput,
      });
      const itManagementAmount =
        createTradeTransactionDto.managementFee * (complan.itManagement / 100);
      const partnersManagementAmount =
        createTradeTransactionDto.managementFee *
        (complan.partnersManagement / 100);
      const tpcpiReferrerManagementAmount =
        createTradeTransactionDto.managementFee *
        (complan.tpcpiReferrerManagement / 100);
      const tpcpiManagementAmount =
        createTradeTransactionDto.managementFee *
        (complan.tpcpiManagement / 100);

      await Promise.all([
        this.releasedManagementFee(
          tx,
          tradeTransaction,
          Allocation.ITManagement,
          itManagementAmount,
        ),
        this.releasedManagementFee(
          tx,
          tradeTransaction,
          Allocation.PartnersManagement,
          partnersManagementAmount,
        ),
        this.releasedManagementFee(
          tx,
          tradeTransaction,
          Allocation.TPCPIReferrerManagement,
          tpcpiReferrerManagementAmount,
        ),
        this.releasedManagementFee(
          tx,
          tradeTransaction,
          Allocation.TPCPIManagement,
          tpcpiManagementAmount,
        ),
        this.handleSubTokensProfit(tx, tradeTransaction, subTokens),
        tx.trade.updateMany({
          where: {
            id: {
              in: tradeIds,
            },
          },
          data: {
            processedAt: new Date(),
            transactionId: tradeTransaction.id,
          }
        })
      ]);
    });
  }

  private calculateCapital(totalGrossSales: number, complan: Complan) {
    return totalGrossSales * (complan.capital / 100);
  }

  private calculateManagementFee(totalGrossSales: number, complan: Complan) {
    if (!complan.managementFee) {
      return 0;
    }
    return totalGrossSales * (complan.managementFee / 100);
  }

  private calculateGrossIncome(
    totalGrossSales: number,
    managementFee: number,
    capital: number,
  ) {
    return totalGrossSales - managementFee - capital;
  }

  private calculateTax(grossIncome: number, complan: Complan) {
    return grossIncome * (complan.tax / 100);
  }

  private calculateNetIncome(grossIncome: number, tax: number) {
    return grossIncome - tax;
  }

  private calculateTokenValue(netIncome: number, unitQuantity: number) {
    return netIncome / unitQuantity;
  }

  releasedManagementFee(
    tx: PrismaService,
    tradeTransaction: TradeTransaction,
    allocation: Allocation,
    amount: number,
  ) {
    return tx.allocationAccount.upsert({
      where: {
        allocation,
      },
      update: {
        balance: {
          increment: amount,
        },
        transactions: {
          create: {
            allocation,
            amount,
            tradeTransaction: {
              connect: {
                id: tradeTransaction.id,
              },
            },
          },
        },
      },
      create: {
        allocation,
        balance: amount,
        transactions: {
          create: {
            allocation,
            amount,
            tradeTransaction: {
              connect: {
                id: tradeTransaction.id,
              },
            },
          },
        },
      },
    });
  }

  private async handleSubTokensProfit(
    tx: PrismaService,
    tradeTransaction: TradeTransaction,
    subTokens: Pick<SubToken, 'id' | 'tokens' | 'holderId'>[],
  ) {
    const updates = subTokens.map((subToken) => ({
      subTokenId: subToken.id,
      holderId: subToken.holderId,
      profitAmount: tradeTransaction.tokenValue * subToken.tokens,
    }));

    await Promise.all(
      updates.map(async ({ holderId, profitAmount }) => {
        await tx.holder.update({
          where: {
            id: holderId,
          },
          data: {
            user: {
              update: {
                account: {
                  update: {
                    balance: {
                      increment: profitAmount,
                    },
                    transactions: {
                      create: {
                        amount: profitAmount,
                        type: AccountTransactionType.Income,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }),
    );

    const subTokenTransactions = updates.map(
      ({ subTokenId, profitAmount }) => ({
        tokenValue: profitAmount,
        tradeTransactionId: tradeTransaction.id,
        subTokenId,
      }),
    );

    await tx.subTokenTransaction.createMany({
      data: subTokenTransactions,
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
        mainTokenId: query.mainTokenId,
        ...this.searchQuery(query),
      },
      include: {
        complan: {
          select: {
            id: true,
            name: true,
          },
        }
      }
    };

    return this.prisma.tradeTransaction.findMany(args);
  }

  count(query: FindManyTradeTransactionQuery) {
    const args: Prisma.TradeTransactionCountArgs = {
      where: {
        mainTokenId: query.mainTokenId,
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
