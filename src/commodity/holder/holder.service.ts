import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Holder, Prisma, User } from '@prisma/client';
import {
  CreateHolderDto,
  FindManyHolderQuery,
  UpdateHolderDto,
} from './holder.dto';

@Injectable({ scope: Scope.REQUEST })
export class HolderService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createHolderDto: CreateHolderDto) {
    const { user, ...holderInput } = createHolderDto;

    return this.prisma.holder.create({
      data: {
        ...holderInput,
        user: {
          create: user,
        },
      },
    });
  }

  findAll(query: FindManyHolderQuery) {
    const args: Prisma.HolderFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            status: true,
          },
        },
      },
    };
    return this.prisma.holder.findMany(args);
  }

  count(query: FindManyHolderQuery) {
    const args: Prisma.HolderCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };
    return this.prisma.holder.count(args);
  }

  private searchQuery(query: FindManyHolderQuery): Prisma.HolderWhereInput {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Holder)[] = [
      'id',
      'firstName',
      'lastName',
      'middleName',
    ];
    const searchUserFields: (keyof User)[] = ['email', 'username'];

    return {
      OR: [
        ...searchFields.map((field) => ({
          [field]: {
            search: query.search,
          },
        })),
        {
          user: {
            OR: searchUserFields.map((field) => ({
              [field]: {
                contains: query.search,
                mode: 'insensitive',
              },
            })),
          },
        },
      ],
    };
  }

  findOne(id: string) {
    return this.prisma.holder.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            status: true,
          },
        },
      },
    });
  }

  update(id: string, updateHolderDto: UpdateHolderDto) {
    return this.prisma.holder.update({
      where: {
        id,
      },
      data: updateHolderDto,
    });
  }

  async remove(id: string) {
    const deletedHolder = await this.prisma.holder.delete({
      where: {
        id,
      },
    });

    await this.prisma.user.delete({
      where: {
        id: deletedHolder.userId,
      },
    });
  }
}
