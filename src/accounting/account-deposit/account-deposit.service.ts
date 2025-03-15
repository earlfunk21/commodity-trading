import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import {
  AccountDeposit,
  AccountTransactionType,
  DepositStatus,
  Prisma,
} from '@prisma/client';
import {
  CreateAccountDepositDto,
  FindManyAccountDepositQuery,
} from './account-deposit.dto';

@Injectable({ scope: Scope.REQUEST })
export class AccountDepositService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createAccountDepositDto: CreateAccountDepositDto) {
    return this.prisma.transaction(async (tx) => {
      let account = await tx.account.findUnique({
        where: {
          userId: createAccountDepositDto.userId,
        },
      });

      if (!account) {
        account = await tx.account.create({
          data: {
            userId: createAccountDepositDto.userId,
            balance: 0,
          },
        });
      }

      const accountDeposit = await tx.accountDeposit.create({
        data: {
          account: {
            connect: {
              id: account.id,
            },
          },
          amount: createAccountDepositDto.amount,
          status: createAccountDepositDto.status,
        },
      });

      if (accountDeposit.status === DepositStatus.Approved) {
        await tx.account.update({
          where: {
            id: account.id,
          },
          data: {
            balance: {
              increment: createAccountDepositDto.amount,
            },
            transactions: {
              create: {
                type: AccountTransactionType.Deposit,
                amount: createAccountDepositDto.amount,
                accountDepositId: accountDeposit.id,
              },
            },
            deposits: {
              connect: {
                id: accountDeposit.id,
              },
            },
          },
        });
      }
      return accountDeposit;
    });
  }

  findAll(query: FindManyAccountDepositQuery) {
    const args: Prisma.AccountDepositFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        account: {
          user: {
            username: query.username,
          },
        },
        accountId: query.accountId,
        status: query.status,
        ...this.searchQuery(query),
      },
      include: {
        account: {
          select: {
            id: true,
            balance: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            }
          }
        }
      }
    };

    return this.prisma.accountDeposit.findMany(args);
  }

  count(query: FindManyAccountDepositQuery) {
    const args: Prisma.AccountDepositCountArgs = {
      where: {
        account: {
          user: {
            username: query.username,
          },
        },
        accountId: query.accountId,
        status: query.status,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.accountDeposit.count(args);
  }

  private searchQuery(query: FindManyAccountDepositQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof AccountDeposit)[] = ['id', 'accountId'];

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
    return this.prisma.accountDeposit.findUnique({
      where: {
        id,
      },
    });
  }
}
