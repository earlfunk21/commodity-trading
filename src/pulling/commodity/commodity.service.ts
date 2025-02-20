import { FileService } from '@/common/file/file.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import {
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Commodity, Prisma } from '@prisma/client';
import slugify from 'slugify';
import {
  CreateCommodityDto,
  FindManyCommodityQuery,
  UpdateCommodityDto,
} from './commodity.dto';

@Injectable({ scope: Scope.REQUEST })
export class CommodityService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createCommodityDto: CreateCommodityDto) {
    createCommodityDto.slug = slugify(createCommodityDto.name, {
      replacement: '-',
      strict: true,
      lower: true,
    });
    return this.prisma.commodity.create({
      data: createCommodityDto,
    });
  }

  findAll(query: FindManyCommodityQuery) {
    const args: Prisma.CommodityFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
      },
      include: {
        _count: {
          select: {
            types: true,
            mainTokens: true,
          },
        },
      },
    };

    return this.prisma.commodity.findMany(args);
  }

  count(query: FindManyCommodityQuery) {
    const args: Prisma.CommodityCountArgs = {
      where: {
        ...this.searchQuery(query),
      },
    };

    return this.prisma.commodity.count(args);
  }

  private searchQuery(query: FindManyCommodityQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Commodity)[] = [
      'id',
      'name',
      'description',
      'slug',
    ];

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

  findOne(slug: string) {
    return this.prisma.commodity.findUnique({
      where: {
        slug,
      },
      include: {
        _count: {
          select: {
            types: true,
            mainTokens: true,
          },
        },
      },
    });
  }

  update(id: string, updateCommodityDto: UpdateCommodityDto) {
    if (updateCommodityDto.name) {
      updateCommodityDto.slug = slugify(updateCommodityDto.name, {
        replacement: '-',
        strict: true,
        lower: true,
      });
    }
    return this.prisma.commodity.update({
      where: {
        id,
      },
      data: updateCommodityDto,
    });
  }

  remove(id: string) {
    return this.prisma.commodity.delete({
      where: {
        id,
      },
    });
  }

  async uploadImage(slug: string, file: Express.Multer.File) {
    const commodity = await this.prisma.commodity.findUniqueOrThrow({
      where: {
        slug,
      },
      select: {
        image: true,
      },
    });

    let image = commodity.image;

    if (!!image) {
      await this.fileService.deleteFile(image);
    }

    image = `${Date.now()}.png`;

    const key = `commodity/${image}`;

    try {
      await this.fileService.uploadImage(file, key);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }

    return this.prisma.commodity.update({
      where: {
        slug,
      },
      data: {
        image,
      },
    });
  }
}
