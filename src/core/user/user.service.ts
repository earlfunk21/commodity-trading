import { PrismaService } from '@/common/prisma/prisma.service';
import { UpdateNewPasswordDto } from '@/core/user/dto/update-new-password.dto';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { FindManyUserQuery } from './dto/find-many-user.query';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  findAll(query: FindManyUserQuery) {
    const args: Prisma.UserFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        role: query.role,
        status: query.status,
        ...this.searchQuery(query),
      },
      omit: {
        password: true,
      },
    };

    return this.prisma.user.findMany(args);
  }

  count(query: FindManyUserQuery) {
    const args: Prisma.UserCountArgs = {
      where: {
        role: query.role,
        status: query.status,
        ...this.searchQuery(query),
      },
    };
    return this.prisma.user.count(args);
  }

  private searchQuery(query: FindManyUserQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof User)[] = ['id', 'email', 'username'];

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

  findOne(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
      omit: {
        password: true,
      },
    });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        username,
      },
      data: updateUserDto,
      omit: {
        password: true,
      },
    });
  }

  async updateNewPassword(
    username: string,
    updateNewPasswordDto: UpdateNewPasswordDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        password: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(
      updateNewPasswordDto.oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    return this.prisma.user.update({
      where: {
        username,
      },
      data: {
        password: updateNewPasswordDto.newPassword,
      },
      omit: {
        password: true,
      },
    });
  }
}
