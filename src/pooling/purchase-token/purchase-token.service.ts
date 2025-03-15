import { PrismaService } from '@/common/prisma/prisma.service';
import { MainTokenTransactionService } from '@/pooling/main-token-transaction/main-token-transaction.service';
import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import {
  AccountTransactionType,
  Prisma,
  PurchaseToken,
  SubTokenStatus,
} from '@prisma/client';
import {
  CreatePurchaseTokenDto,
  FindManyPurchaseTokenQuery,
} from './purchase-token.dto';

@Injectable({ scope: Scope.REQUEST })
export class PurchaseTokenService {
  constructor(
    private prisma: PrismaService,
    private readonly mainTokenTransactionService: MainTokenTransactionService,
  ) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createPurchaseTokenDto: CreatePurchaseTokenDto) {
    const mainToken = await this.prisma.mainToken.findUniqueOrThrow({
      where: {
        id: createPurchaseTokenDto.mainTokenId,
      },
    });

    const holder = await this.prisma.holder.findUniqueOrThrow({
      where: {
        id: createPurchaseTokenDto.holderId,
      },
    });

    const account = await this.prisma.account.findUnique({
      where: {
        userId: holder.userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.balance < createPurchaseTokenDto.amount) {
      throw new Error('Insufficient balance');
    }

    const complan = await this.prisma.complan.findUniqueOrThrow({
      where: {
        id: mainToken.complanId,
      },
    });

    return this.prisma.transaction(async (tx) => {
      this.mainTokenTransactionService.setPrisma(tx);

      createPurchaseTokenDto.capital =
        createPurchaseTokenDto.amount * (complan.capital / 100);
      createPurchaseTokenDto.tokens =
        createPurchaseTokenDto.capital / mainToken.unitValue;

      const [purchaseToken] = await Promise.all([
        tx.purchaseToken.create({
          data: createPurchaseTokenDto,
        }),
        tx.account.update({
          where: {
            id: account.id,
          },
          data: {
            balance: {
              decrement: createPurchaseTokenDto.amount,
            },
            transactions: {
              create: {
                amount: createPurchaseTokenDto.amount,
                type: AccountTransactionType.Purchase,
              },
            },
          },
        }),
        this.mainTokenTransactionService.create({
          amount: createPurchaseTokenDto.capital,
          complanId: mainToken.complanId,
          userId: holder.userId,
          mainTokenId: createPurchaseTokenDto.mainTokenId,
        }),
        tx.subToken.create({
          data: {
            amount: createPurchaseTokenDto.capital,
            tokens: createPurchaseTokenDto.tokens,
            mainTokenId: createPurchaseTokenDto.mainTokenId,
            status: SubTokenStatus.Active,
            holderId: createPurchaseTokenDto.holderId,
          },
        }),
      ]);

      return purchaseToken;
    });
  }

  findAll(query: FindManyPurchaseTokenQuery) {
    const args: Prisma.PurchaseTokenFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.purchaseToken.findMany(args);
  }

  count(query: FindManyPurchaseTokenQuery) {
    const args: Prisma.PurchaseTokenCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.purchaseToken.count(args);
  }

  private searchQuery(query: FindManyPurchaseTokenQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof PurchaseToken)[] = ['id'];

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
    return this.prisma.purchaseToken.findUnique({
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.purchaseToken.delete({
      where: {
        id,
      },
    });
  }
}
