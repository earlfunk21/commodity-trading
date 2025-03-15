import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import {
  AccountTransactionType,
  Allocation,
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
    const mainTokenTransaction = await this.prisma.mainTokenTransaction.create({
      data: createMainTokenTransactionDto,
    });

    await Promise.all([
      this.processReferral(mainTokenTransaction),
      this.processTPCPIReferrer(mainTokenTransaction),
      this.processManagement(mainTokenTransaction),
      this.processPooling(mainTokenTransaction),
      this.processCapital(mainTokenTransaction),
    ]);

    return mainTokenTransaction;
  }

  private async processReferral(mainTokenTransaction: MainTokenTransaction) {
    const { complanId, amount } = mainTokenTransaction;

    const [complan, upline] = await Promise.all([
      this.prisma.complan.findUniqueOrThrow({
        where: {
          id: complanId,
        },
      }),
      this.prisma.user.findFirst({
        where: {
          downlines: {
            some: {
              id: mainTokenTransaction.userId,
            },
          },
        },
      }),
    ]);

    if (!complan.referral || !upline) {
      return;
    }

    const referralAmount = amount * (complan.referral / 100);

    await Promise.all([
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.Referral,
        },
        data: {
          balance: {
            increment: referralAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.Referral,
              amount: referralAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
      this.prisma.user.update({
        where: {
          id: upline.id,
        },
        data: {
          account: {
            update: {
              balance: {
                increment: referralAmount,
              },
              transactions: {
                create: {
                  amount: referralAmount,
                  type: AccountTransactionType.Income,
                },
              },
            },
          },
        },
      }),
    ]);
  }

  private async processTPCPIReferrer(
    mainTokenTransaction: MainTokenTransaction,
  ) {
    const { complanId, amount } = mainTokenTransaction;

    const [complan, upline] = await Promise.all([
      this.prisma.complan.findUniqueOrThrow({
        where: {
          id: complanId,
        },
      }),
      this.prisma.user.findFirst({
        where: {
          downlines: {
            some: {
              id: mainTokenTransaction.userId,
            },
          },
        },
      }),
    ]);

    if (!complan.tpcpiReferrer || !upline) {
      return;
    }

    const tpcpiReferrerAmount = amount * (complan.referral / 100);

    await Promise.all([
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.TPCPIReferrer,
        },
        data: {
          balance: {
            increment: tpcpiReferrerAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.TPCPIReferrer,
              amount: tpcpiReferrerAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
      this.prisma.tPCPIReferrerCommission.create({
        data: {
          amount: tpcpiReferrerAmount,
          user: {
            connect: {
              id: upline.id,
            },
          },
          mainTokenTransaction: {
            connect: {
              id: mainTokenTransaction.id,
            },
          },
          mainToken: {
            connect: {
              id: mainTokenTransaction.mainTokenId,
            },
          },
        },
      }),
    ]);
  }

  private async processManagement(mainTokenTransaction: MainTokenTransaction) {
    const { complanId, amount } = mainTokenTransaction;

    const complan = await this.prisma.complan.findUniqueOrThrow({
      where: {
        id: complanId,
      },
    });

    if (!complan.management) {
      return;
    }

    const managementAmount = amount * (complan.referral / 100);

    const itManagementAmount = managementAmount * (complan.itManagement / 100);
    const partnersManagementAmount =
      managementAmount * (complan.partnersManagement / 100);
    const tpcpiReferrerManagementAmount =
      managementAmount * (complan.tpcpiReferrerManagement / 100);
    const tpcpiManagementAmount =
      managementAmount * (complan.tpcpiManagement / 100);

    await Promise.all([
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.Management,
        },
        data: {
          balance: {
            increment: managementAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.Management,
              amount: managementAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.ITManagement,
        },
        data: {
          balance: {
            increment: itManagementAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.ITManagement,
              amount: itManagementAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.PartnersManagement,
        },
        data: {
          balance: {
            increment: partnersManagementAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.PartnersManagement,
              amount: partnersManagementAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.TPCPIReferrerManagement,
        },
        data: {
          balance: {
            increment: tpcpiReferrerManagementAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.TPCPIReferrerManagement,
              amount: tpcpiReferrerManagementAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
      this.prisma.allocationAccount.update({
        where: {
          allocation: Allocation.TPCPIManagement,
        },
        data: {
          balance: {
            increment: tpcpiManagementAmount,
          },
          transactions: {
            create: {
              allocation: Allocation.TPCPIManagement,
              amount: tpcpiManagementAmount,
              complan: {
                connect: {
                  id: complanId,
                },
              },
              mainTokenTransaction: {
                connect: {
                  id: mainTokenTransaction.id,
                },
              },
            },
          },
        },
      }),
    ]);
  }

  private async processPooling(mainTokenTransaction: MainTokenTransaction) {
    const { complanId, amount } = mainTokenTransaction;

    const complan = await this.prisma.complan.findUniqueOrThrow({
      where: {
        id: complanId,
      },
    });

    if (!complan.pooling) {
      return;
    }

    const poolingAmount = amount * (complan.referral / 100);

    await this.prisma.allocationAccount.update({
      where: {
        allocation: Allocation.Pooling,
      },
      data: {
        balance: {
          increment: poolingAmount,
        },
        transactions: {
          create: {
            allocation: Allocation.Pooling,
            amount: poolingAmount,
            complan: {
              connect: {
                id: complanId,
              },
            },
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

  private async processCapital(mainTokenTransaction: MainTokenTransaction) {
    const { complanId, amount } = mainTokenTransaction;

    const complan = await this.prisma.complan.findUniqueOrThrow({
      where: {
        id: complanId,
      },
    });

    if (!complan.capital) {
      return;
    }

    const capitalAmount = amount * (complan.referral / 100);

    await this.prisma.allocationAccount.update({
      where: {
        allocation: Allocation.Capital,
      },
      data: {
        balance: {
          increment: capitalAmount,
        },
        transactions: {
          create: {
            allocation: Allocation.Capital,
            amount: capitalAmount,
            complan: {
              connect: {
                id: complanId,
              },
            },
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
