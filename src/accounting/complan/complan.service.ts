import { PrismaService } from '@/common/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Complan, Prisma } from '@prisma/client';
import {
  CreateComplanDto,
  FindManyComplanQuery,
  UpdateComplanDto,
} from './complan.dto';

@Injectable({ scope: Scope.REQUEST })
export class ComplanService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createComplanDto: CreateComplanDto) {
    const totalPercentage =
      createComplanDto.commission +
      createComplanDto.tax +
      createComplanDto.referralCommission +
      createComplanDto.pendingReferralCommission +
      createComplanDto.managementFee +
      createComplanDto.pendingManagementFee +
      createComplanDto.capital;
    if (totalPercentage !== 100) {
      throw new UnprocessableEntityException(
        `The sum of referral, management, capital, tax and commission was ${totalPercentage} must be 100%`,
      );
    }

    const managementPercentage =
      createComplanDto.itManagement +
      createComplanDto.partnersManagement +
      createComplanDto.tpcpiReferrerManagement +
      createComplanDto.tpcpiManagement;
    if (managementPercentage !== 100) {
      throw new UnprocessableEntityException(
        'The sum of itManagement, partnersManagement, tpcpiReferrerManagement, and tpcpiManagement must 100%',
      );
    }

    return this.prisma.complan.create({
      data: createComplanDto,
    });
  }

  findAll(query: FindManyComplanQuery) {
    const args: Prisma.ComplanFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.complan.findMany(args);
  }

  count(query: FindManyComplanQuery) {
    const args: Prisma.ComplanCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.complan.count(args);
  }

  private searchQuery(query: FindManyComplanQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Complan)[] = ['id'];

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
    return this.prisma.complan.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateComplanDto: UpdateComplanDto) {
    // Get current complan to check against partial updates
    const currentComplan = await this.prisma.complan.findUnique({
      where: {
        id,
      },
    });

    if (currentComplan === null) {
      throw new NotFoundException('Complan not found');
    }

    const totalPercentage =
      (updateComplanDto.commission ?? 0) +
      (updateComplanDto.tax ?? 0) +
      (updateComplanDto.referralCommission ?? 0) +
      (updateComplanDto.pendingReferralCommission ?? 0) +
      (updateComplanDto.managementFee ?? 0) +
      (updateComplanDto.pendingManagementFee ?? 0) +
      (updateComplanDto.capital ?? 0);
    if (totalPercentage !== 100) {
      throw new UnprocessableEntityException(
        `The sum of referral, management, capital, tax and commission was ${totalPercentage} must be 100%`,
      );
    }

    const managementPercentage =
      (updateComplanDto.itManagement ?? currentComplan.itManagement) +
      (updateComplanDto.partnersManagement ??
        currentComplan.partnersManagement) +
      (updateComplanDto.tpcpiReferrerManagement ??
        currentComplan.tpcpiReferrerManagement) +
      (updateComplanDto.tpcpiManagement ?? currentComplan.tpcpiManagement);

    if (managementPercentage !== 100) {
      throw new UnprocessableEntityException(
        'The sum of itManagement, partnersManagement, tpcpiReferrerManagement, and tpcpiManagement must be 100%',
      );
    }
    return this.prisma.complan.update({
      where: {
        id,
      },
      data: updateComplanDto,
    });
  }

  remove(id: string) {
    return this.prisma.complan.delete({
      where: {
        id,
      },
    });
  }
}
