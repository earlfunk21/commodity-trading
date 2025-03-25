import { FileService } from '@/common/file/file.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { CommodityType, Prisma } from '@prisma/client';
import slugify from 'slugify';
import {
  CreateCommodityTypeDto,
  FindManyCommodityTypeQuery,
  UpdateCommodityTypeDto,
} from './commodity-type.dto';

@Injectable({ scope: Scope.REQUEST })
export class CommodityTypeService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createCommodityTypeDto: CreateCommodityTypeDto) {
    createCommodityTypeDto.slug = slugify(createCommodityTypeDto.name, {
      replacement: '-',
      strict: true,
      lower: true,
    });
    return this.prisma.commodityType.create({
      data: createCommodityTypeDto,
    });
  }

  async findAll(query: FindManyCommodityTypeQuery) {
    const commodityTypes = await this.prisma.commodityType.findMany({
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        commodity: {
          slug: query.commoditySlug,
        },
        commodityId: query.commodityId,
        ...this.searchQuery(query),
      },
      include: {
        commodity: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Promise.all(
      commodityTypes.map(async (commodityType) => {
        const [currentMainToken, lastMainToken] = await Promise.all([
          this.prisma.mainTokenValue.aggregate({
            where: {
              currentMainTokens: {
                some: {
                  commodityTypeId: commodityType.id,
                },
              },
            },
            _sum: {
              unitValue: true,
              soldTokens: true,
              volume: true,
            },
          }),
          this.prisma.mainTokenValue.aggregate({
            where: {
              lastMainTokens: {
                some: {
                  commodityTypeId: commodityType.id,
                },
              },
            },
            _sum: {
              unitValue: true,
            },
          }),
        ]);

        const unitValue = currentMainToken._sum.unitValue || 0;
        const lastValue = lastMainToken._sum.unitValue || unitValue;
        const change = ((unitValue - lastValue) / lastValue) * 100;
        const soldTokens = currentMainToken._sum.soldTokens || 0;
        const volume = currentMainToken._sum.volume || 0;

        return {
          ...commodityType,
          last: lastValue,
          change,
          volume: volume - soldTokens,
        };
      }),
    );
  }

  count(query: FindManyCommodityTypeQuery) {
    const args: Prisma.CommodityTypeCountArgs = {
      where: {
        commodity: {
          slug: query.commoditySlug,
        },
        commodityId: query.commodityId,
        ...this.searchQuery(query),
      },
    };

    return this.prisma.commodityType.count(args);
  }

  private searchQuery(query: FindManyCommodityTypeQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof CommodityType)[] = [
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

  async findOne(slug: string) {
    const commodityType = await this.prisma.commodityType.findUniqueOrThrow({
      where: {
        slug,
      },
      include: {
        commodity: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            mainTokens: true,
          },
        },
      },
    });

    const [currentMainToken, lastMainToken] = await Promise.all([
      this.prisma.mainTokenValue.aggregate({
        where: {
          currentMainTokens: {
            some: {
              commodityTypeId: commodityType.id,
            },
          },
        },
        _sum: {
          unitValue: true,
          soldTokens: true,
          volume: true,
        },
      }),
      this.prisma.mainTokenValue.aggregate({
        where: {
          lastMainTokens: {
            some: {
              commodityTypeId: commodityType.id,
            },
          },
        },
        _sum: {
          unitValue: true,
        },
      }),
    ]);

    const unitValue = currentMainToken._sum.unitValue || 0;
    const lastValue = lastMainToken._sum.unitValue || 0;
    const change = ((unitValue - lastValue) / lastValue) * 100;
    const soldTokens = currentMainToken._sum.soldTokens || 0;
    const volume = currentMainToken._sum.volume || 0;

    return {
      ...commodityType,
      last: lastValue,
      change,
      volume: volume - soldTokens,
    };
  }

  update(id: string, updateCommodityTypeDto: UpdateCommodityTypeDto) {
    if (updateCommodityTypeDto.name) {
      updateCommodityTypeDto.slug = slugify(updateCommodityTypeDto.name, {
        replacement: '-',
        strict: true,
        lower: true,
      });
    }
    return this.prisma.commodityType.update({
      where: {
        id,
      },
      data: updateCommodityTypeDto,
    });
  }

  remove(id: string) {
    return this.prisma.commodityType.delete({
      where: {
        id,
      },
    });
  }

  async uploadImages(slug: string, files: Express.Multer.File[]) {
    const uploadPromises: Promise<any>[] = [];
    const images: string[] = [];

    for (const [i, file] of files.entries()) {
      const image = `${Date.now()}${i}.png`;
      const key = `commodity-type/${image}`;
      const promise = this.fileService.uploadImage(file, key);
      images.push(image);
      uploadPromises.push(promise);
    }

    await Promise.all(uploadPromises);

    return this.prisma.commodityType.update({
      where: {
        slug,
      },
      data: {
        images: {
          push: images,
        },
      },
    });
  }

  async deleteImage(slug: string, image: string) {
    const commodityType = await this.prisma.commodityType.findUniqueOrThrow({
      where: {
        slug,
      },
      select: {
        images: true,
      },
    });

    const key = `commodity-type/${image}`;

    await this.fileService.deleteFile(key);

    return this.prisma.commodityType.update({
      where: {
        slug,
      },
      data: {
        images: {
          set: commodityType.images.filter((i) => i !== image),
        },
      },
    });
  }

  async uploadVideos(slug: string, files: Express.Multer.File[]) {
    const uploadPromises: Promise<any>[] = [];
    const videos: string[] = [];

    for (const [i, file] of files.entries()) {
      const video = `${Date.now()}${i}.${file.mimetype.split('/')[1]}`;
      const key = `commodity-type/${video}`;
      const promise = this.fileService.uploadVideo(file, key);
      videos.push(video);
      uploadPromises.push(promise);
    }

    await Promise.all(uploadPromises);

    return this.prisma.commodityType.update({
      where: {
        slug,
      },
      data: {
        videos: {
          push: videos,
        },
      },
    });
  }

  async deleteVideo(slug: string, video: string) {
    const commodityType = await this.prisma.commodityType.findUniqueOrThrow({
      where: {
        slug,
      },
      select: {
        videos: true,
      },
    });

    const key = `commodity-type/${video}`;

    await this.fileService.deleteFile(key);

    return this.prisma.commodityType.update({
      where: {
        slug,
      },
      data: {
        videos: {
          set: commodityType.videos.filter((i) => i !== video),
        },
      },
    });
  }
}
