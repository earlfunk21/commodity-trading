import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Admin, Prisma, User } from '@prisma/client';
import {
  CreateAdminDto,
  FindManyAdminQuery,
  UpdateAdminDto,
} from './admin.dto';

@Injectable({ scope: Scope.REQUEST })
export class AdminService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createAdminDto: CreateAdminDto) {
    const { user, ...adminInput } = createAdminDto;

    return this.prisma.admin.create({
      data: {
        ...adminInput,
        user: {
          create: user,
        },
      },
    });
  }

  findAll(query: FindManyAdminQuery) {
    const args: Prisma.AdminFindManyArgs = {
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
    return this.prisma.admin.findMany(args);
  }

  count(query: FindManyAdminQuery) {
    const args: Prisma.AdminCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };
    return this.prisma.admin.count(args);
  }

  private searchQuery(query: FindManyAdminQuery): Prisma.AdminWhereInput {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Admin)[] = [
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
    return this.prisma.admin.findUnique({
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

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.prisma.admin.update({
      where: {
        id,
      },
      data: updateAdminDto,
    });
  }

  async remove(id: string) {
    const deletedAdmin = await this.prisma.admin.delete({
      where: {
        id,
      },
    });

    await this.prisma.user.delete({
      where: {
        id: deletedAdmin.userId,
      },
    });

    return deletedAdmin
  }
}
