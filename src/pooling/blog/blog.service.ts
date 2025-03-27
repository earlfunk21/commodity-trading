import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Blog, Prisma } from '@prisma/client';
import slugify from 'slugify';
import { CreateBlogDto, FindManyBlogQuery, UpdateBlogDto } from './blog.dto';

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(private prisma: PrismaService) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createBlogDto: CreateBlogDto) {
    const commodity = await this.prisma.commodity.findUniqueOrThrow({
      where: {
        id: createBlogDto.commodityId,
      },
    });

    createBlogDto.slug = slugify(createBlogDto.title, {
      replacement: '-',
      strict: true,
      lower: true,
    });

    createBlogDto.slug = `${createBlogDto.slug}-${commodity.slug}`;

    return this.prisma.blog.create({
      data: createBlogDto,
    });
  }

  findAll(query: FindManyBlogQuery) {
    const args: Prisma.BlogFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        show: query.show,
        ...this.searchQuery(query),
      },
      include: {
        commodity: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    };

    return this.prisma.blog.findMany(args);
  }

  count(query: FindManyBlogQuery) {
    const args: Prisma.BlogCountArgs = {
      where: {
        show: query.show,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.blog.count(args);
  }

  private searchQuery(query: FindManyBlogQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof Blog)[] = ['id'];

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
    return this.prisma.blog.findUnique({
      where: {
        slug,
      },
      include: {
        commodity: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: updateBlogDto,
    });
  }

  remove(id: string) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
}
