import { PrismaService } from '@/common/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async create(createTradeDto: CreateTradeDto) {
    createTradeDto.grossSales =
      createTradeDto.soldAmount * createTradeDto.quantity;

    const mainTokenValue = await this.prisma.mainTokenValue.findFirst({
      where: {
        currentMainTokens: {
          some: {
            id: createTradeDto.mainTokenId,
          },
        },
      },
    });

    if (!mainTokenValue) {
      throw new NotFoundException('Main token value not found');
    }

    createTradeDto.mainTokenValueId = mainTokenValue.id;

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
        ...(query.processed !== undefined && {
          processedAt: query.processed ? { not: null } : null,
        }),
        mainTokenId: query.mainTokenId,
        ...this.searchQuery(query),
      },
      include: {
        mainToken: {
          select: {
            id: true,
            code: true,
          },
        },
      },
    };

    return this.prisma.trade.findMany(args);
  }

  count(query: FindManyTradeQuery) {
    const args: Prisma.TradeCountArgs = {
      where: {
        ...(query.processed !== undefined && {
          processedAt: query.processed ? { not: null } : null,
        }),
        mainTokenId: query.mainTokenId,
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

  async update(id: string, updateTradeDto: UpdateTradeDto) {
    const trade = await this.prisma.trade.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (!trade) {
      throw new NotFoundException('Trade not found');
    }

    if (!!trade.processedAt) {
      throw new UnprocessableEntityException(
        'Trade already processed and cannot be updated',
      );
    }

    return this.prisma.trade.update({
      where: {
        id,
      },
      data: updateTradeDto,
    });
  }

  async remove(id: string) {
    const trade = await this.prisma.trade.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (!trade) {
      throw new NotFoundException('Trade not found');
    }

    if (!!trade.processedAt) {
      throw new UnprocessableEntityException(
        'Trade already processed and cannot be deleted',
      );
    }

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
