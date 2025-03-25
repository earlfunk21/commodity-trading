import { PrismaService } from '@/common/prisma/prisma.service';
import { MainTokenTransactionService } from '@/pooling/main-token-transaction/main-token-transaction.service';
import { Injectable, Scope } from '@nestjs/common';
import { Allocation, MainToken, Prisma } from '@prisma/client';
import {
  CreateMainTokenDto,
  FindManyMainTokenQuery,
  UpdateMainTokenDto,
} from './main-token.dto';

@Injectable({ scope: Scope.REQUEST })
export class MainTokenService {
  constructor(
    private prisma: PrismaService,
    private readonly mainTokenTransactionService: MainTokenTransactionService,
  ) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createMainTokenDto: CreateMainTokenDto) {
    return this.prisma.transaction(async (tx) => {
      const { totalValue, unitValue, ...mainTokenInput } = createMainTokenDto;

      const mainToken = await tx.mainToken.create({
        data: mainTokenInput,
      });

      await tx.mainTokenValue.create({
        data: {
          commodityId: createMainTokenDto.commodityId,
          commodityTypeId: createMainTokenDto.commodityTypeId,
          mainTokenId: mainToken.id,
          totalValue,
          unitValue,
          volume: totalValue / unitValue,
          currentMainTokens: {
            connect: {
              id: mainToken.id,
            },
          },
          lastMainTokens: {
            connect: {
              id: mainToken.id,
            },
          },
        },
      });

      return mainToken;
    });
  }

  async findAll(query: FindManyMainTokenQuery) {
    const mainTokens = await this.prisma.mainToken.findMany({
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
        commodityType: {
          slug: query.commodityTypeSlug,
        },
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
            pendingManagementFees: {
              where: {
                releasedAt: null,
              },
            },
            referralCommissions: {
              where: {
                releasedAt: null,
              },
            },
          },
        },
        currentTokenValue: {
          select: {
            totalValue: true,
            unitValue: true,
            soldTokens: true,
            volume: true,
          },
        },
        lastTokenValue: {
          select: {
            unitValue: true,
          },
        },
      },
    });

    return mainTokens.map((mainToken) => {
      const { currentTokenValue, lastTokenValue } = mainToken;

      let unitValue = 0;
      let lastValue = 0;
      let soldTokens = 0;
      let volume = 0;

      if (!!currentTokenValue) {
        unitValue = currentTokenValue.unitValue;
        soldTokens = currentTokenValue.soldTokens;
        volume = currentTokenValue.volume;
      }

      if (!!lastTokenValue) {
        lastValue = lastTokenValue.unitValue;
      } else {
        lastValue = unitValue;
      }

      const change = ((unitValue - lastValue) / lastValue) * 100;

      return {
        ...mainToken,
        last: lastValue,
        change,
        volume: volume - soldTokens,
      };
    });
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
        commodityType: {
          slug: query.commodityTypeSlug,
        },
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
            pendingManagementFees: {
              where: {
                releasedAt: null,
              },
            },
            referralCommissions: {
              where: {
                releasedAt: null,
              },
            },
          },
        },
        currentTokenValue: {
          select: {
            totalValue: true,
            unitValue: true,
            soldTokens: true,
            volume: true,
          },
        },
        lastTokenValue: {
          select: {
            unitValue: true,
          },
        },
      },
    });

    const { currentTokenValue, lastTokenValue } = mainToken;

    let unitValue = 0;
    let lastValue = 0;
    let soldTokens = 0;
    let volume = 0;

    if (!!currentTokenValue) {
      unitValue = currentTokenValue.unitValue;
      soldTokens = currentTokenValue.soldTokens;
      volume = currentTokenValue.volume;
    }

    if (!!lastTokenValue) {
      lastValue = lastTokenValue.unitValue;
    } else {
      lastValue = unitValue;
    }

    const change = ((unitValue - lastValue) / lastValue) * 100;

    return {
      ...mainToken,
      last: lastValue,
      change,
      volume: volume - soldTokens,
    };
  }

  update(id: string, updateMainTokenDto: UpdateMainTokenDto) {
    const { totalValue, unitValue, ...mainTokenInput } = updateMainTokenDto;

    return this.prisma.mainToken.update({
      where: {
        id,
      },
      data: mainTokenInput,
    });
  }

  remove(id: string) {
    return this.prisma.mainToken.delete({
      where: {
        id,
      },
    });
  }

  async releasedReferralCommission(mainTokenId: string) {
    await this.prisma.transaction(async (tx) => {
      const referralCommissions =
        await tx.referralCommission.updateManyAndReturn({
          where: {
            releasedAt: null,
            mainTokenId,
          },
          data: {
            releasedAt: new Date(),
          },
          include: {
            mainTokenTransaction: true,
          },
        });

      this.mainTokenTransactionService.setPrisma(tx);

      const promises: any[] = [];

      for (const referralCommission of referralCommissions) {
        if (!referralCommission.mainTokenTransaction) {
          continue;
        }
        const promise =
          await this.mainTokenTransactionService.releaseReferralCommission(
            referralCommission.mainTokenTransaction,
            referralCommission.amount,
            referralCommission.userId,
          );
        promises.push(promise);
      }

      await Promise.all(promises);
    });

    return this.prisma.mainToken.findUnique({
      where: {
        id: mainTokenId,
      },
    });
  }

  async releasedManagementFee(mainTokenId: string) {
    await this.prisma.transaction(async (tx) => {
      const managementFees = await tx.pendingManagementFee.updateManyAndReturn({
        where: {
          releasedAt: null,
          mainTokenId,
        },
        data: {
          releasedAt: new Date(),
        },
        include: {
          mainTokenTransaction: true,
        },
      });

      this.mainTokenTransactionService.setPrisma(tx);

      const promises: any[] = [];

      for (const managementFee of managementFees) {
        if (!managementFee.mainTokenTransaction) {
          continue;
        }

        const {
          itManagementAmount,
          partnersManagementAmount,
          tpcpiReferrerManagementAmount,
          tpcpiManagementAmount,
        } = managementFee;

        promises.push(
          ...[
            this.mainTokenTransactionService.releasedManagementFee(
              managementFee.mainTokenTransaction,
              Allocation.ITManagement,
              itManagementAmount,
            ),
            this.mainTokenTransactionService.releasedManagementFee(
              managementFee.mainTokenTransaction,
              Allocation.PartnersManagement,
              partnersManagementAmount,
            ),
            this.mainTokenTransactionService.releasedManagementFee(
              managementFee.mainTokenTransaction,
              Allocation.TPCPIReferrerManagement,
              tpcpiReferrerManagementAmount,
            ),
            this.mainTokenTransactionService.releasedManagementFee(
              managementFee.mainTokenTransaction,
              Allocation.TPCPIManagement,
              tpcpiManagementAmount,
            ),
          ],
        );
      }

      await Promise.all(promises);
    });

    return this.prisma.mainToken.findUnique({
      where: {
        id: mainTokenId,
      },
    });
  }
}
