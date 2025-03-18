import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import {
  AccountTransactionType,
  Allocation,
  Complan,
  MainTokenTransaction,
  Prisma,
} from '@prisma/client';
import {
  CreateMainTokenTransactionDto,
  FindManyMainTokenTransactionQuery,
} from './main-token-transaction.dto';

@Injectable({ scope: Scope.REQUEST })
export class MainTokenTransactionService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createMainTokenTransactionDto: CreateMainTokenTransactionDto) {
    const [mainTokenTransaction, complan] = await Promise.all([
      this.prisma.mainTokenTransaction.create({
        data: createMainTokenTransactionDto,
      }),
      this.prisma.complan.findUniqueOrThrow({
        where: {
          id: createMainTokenTransactionDto.complanId,
        },
      }),
    ]);

    await Promise.all([
      this.processReferralCommission(mainTokenTransaction, complan),
      this.processPendingReferralCommission(mainTokenTransaction, complan),
      this.processManagement(mainTokenTransaction, complan),
      this.processPendingManagement(mainTokenTransaction, complan),
    ]);

    return mainTokenTransaction;
  }

  private async processReferralCommission(
    mainTokenTransaction: MainTokenTransaction,
    complan: Complan,
  ) {
    const { amount } = mainTokenTransaction;

    const upline = await this.prisma.user.findFirst({
      where: {
        downlines: {
          some: {
            id: mainTokenTransaction.userId,
          },
        },
      },
    });

    if (!complan.referralCommission) {
      return;
    }

    const referralCommissionAmount =
      amount * (complan.referralCommission / 100);

    if (!upline) {
      return this.releaseReferralCommission(
        mainTokenTransaction,
        referralCommissionAmount,
      );
    }

    await Promise.all([
      this.prisma.referralCommission.create({
        data: {
          amount: referralCommissionAmount,
          userId: upline.id,
          mainTokenTransactionId: mainTokenTransaction.id,
          mainTokenId: mainTokenTransaction.mainTokenId,
          releasedAt: new Date(),
        },
      }),
      this.releaseReferralCommission(
        mainTokenTransaction,
        referralCommissionAmount,
        upline.id,
      ),
    ]);
  }

  releaseReferralCommission(
    mainTokenTransaction: MainTokenTransaction,
    amount: number,
    uplineId?: string,
  ) {
    if (!uplineId) {
      return this.prisma.allocationAccount.upsert({
        where: {
          allocation: Allocation.UnclaimedReferral,
        },
        update: {
          balance: {
            increment: amount,
          },
          transactions: {
            create: {
              allocation: Allocation.UnclaimedReferral,
              amount: amount,
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
        create: {
          allocation: Allocation.UnclaimedReferral,
          balance: amount,
          transactions: {
            create: {
              allocation: Allocation.UnclaimedReferral,
              amount: amount,
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      });
    }

    return this.prisma.account.upsert({
      where: {
        userId: uplineId,
      },
      create: {
        user: {
          connect: {
            id: uplineId,
          },
        },
        balance: amount,
        transactions: {
          create: {
            amount: amount,
            type: AccountTransactionType.Referral,
          },
        },
      },
      update: {
        balance: {
          increment: amount,
        },
        transactions: {
          create: {
            amount: amount,
            type: AccountTransactionType.Referral,
          },
        },
      },
    });
  }

  private async processPendingReferralCommission(
    mainTokenTransaction: MainTokenTransaction,
    complan: Complan,
  ) {
    const { amount } = mainTokenTransaction;

    const upline = await this.prisma.user.findFirst({
      where: {
        downlines: {
          some: {
            id: mainTokenTransaction.userId,
          },
        },
      },
    });

    if (!complan.pendingReferralCommission || !upline) {
      return;
    }

    const pendingReferralCommission =
      amount * (complan.pendingReferralCommission / 100);

    await this.prisma.referralCommission.create({
      data: {
        amount: pendingReferralCommission,
        userId: upline.id,
        mainTokenTransactionId: mainTokenTransaction.id,
        mainTokenId: mainTokenTransaction.mainTokenId,
      },
    });
  }

  private async processManagement(
    mainTokenTransaction: MainTokenTransaction,
    complan: Complan,
  ) {
    const { amount } = mainTokenTransaction;

    if (!complan.managementFee) {
      return;
    }

    const managementAmount = amount * (complan.managementFee / 100);

    const itManagementAmount = managementAmount * (complan.itManagement / 100);
    const partnersManagementAmount =
      managementAmount * (complan.partnersManagement / 100);
    const tpcpiReferrerManagementAmount =
      managementAmount * (complan.tpcpiReferrerManagement / 100);
    const tpcpiManagementAmount =
      managementAmount * (complan.tpcpiManagement / 100);

    await Promise.all([
      this.releasedManagementFee(
        mainTokenTransaction,
        Allocation.ITManagement,
        itManagementAmount,
      ),
      this.releasedManagementFee(
        mainTokenTransaction,
        Allocation.PartnersManagement,
        partnersManagementAmount,
      ),
      this.releasedManagementFee(
        mainTokenTransaction,
        Allocation.TPCPIReferrerManagement,
        tpcpiReferrerManagementAmount,
      ),
      this.releasedManagementFee(
        mainTokenTransaction,
        Allocation.TPCPIManagement,
        tpcpiManagementAmount,
      ),
    ]);
  }

  releasedManagementFee(
    mainTokenTransaction: MainTokenTransaction,
    allocation: Allocation,
    amount: number,
  ) {
    return this.prisma.allocationAccount.upsert({
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
            mainTokenTransaction: {
              connect: {
                id: mainTokenTransaction.id,
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
            mainTokenTransaction: {
              connect: {
                id: mainTokenTransaction.id,
              },
            },
          },
        },
      },
    });
  }

  private async processPendingManagement(
    mainTokenTransaction: MainTokenTransaction,
    complan: Complan,
  ) {
    const { amount } = mainTokenTransaction;

    if (!complan.pendingManagementFee) {
      return;
    }

    const managementAmount = amount * (complan.pendingManagementFee / 100);

    const itManagementAmount = managementAmount * (complan.itManagement / 100);
    const partnersManagementAmount =
      managementAmount * (complan.partnersManagement / 100);
    const tpcpiReferrerManagementAmount =
      managementAmount * (complan.tpcpiReferrerManagement / 100);
    const tpcpiManagementAmount =
      managementAmount * (complan.tpcpiManagement / 100);

    await this.prisma.pendingManagementFee.create({
      data: {
        mainToken: {
          connect: {
            id: mainTokenTransaction.mainTokenId,
          },
        },
        amount: managementAmount,
        mainTokenTransaction: {
          connect: {
            id: mainTokenTransaction.id,
          },
        },
        itManagementAmount: itManagementAmount,
        partnersManagementAmount: partnersManagementAmount,
        tpcpiReferrerManagementAmount: tpcpiReferrerManagementAmount,
        tpcpiManagementAmount: tpcpiManagementAmount,
      },
    });
  }

  findAll(query: FindManyMainTokenTransactionQuery) {
    const args: Prisma.MainTokenTransactionFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        mainToken: {
          code: query.mainTokenCode,
        },
        ...this.searchQuery(query),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        complan: {
          select: {
            name: true,
          },
        },
        mainToken: {
          select: {
            name: true,
          },
        },
      },
    };

    return this.prisma.mainTokenTransaction.findMany(args);
  }

  count(query: FindManyMainTokenTransactionQuery) {
    const args: Prisma.MainTokenTransactionCountArgs = {
      where: {
        mainToken: {
          code: query.mainTokenCode,
        },
        ...this.searchQuery(query),
      },
    };

    return this.prisma.mainTokenTransaction.count(args);
  }

  private searchQuery(query: FindManyMainTokenTransactionQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof MainTokenTransaction)[] = ['id'];

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
    return this.prisma.mainTokenTransaction.findUnique({
      where: {
        id,
      },
    });
  }
}
