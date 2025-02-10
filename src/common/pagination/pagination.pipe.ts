import { PaginationQuery } from '@/common/pagination/pagination.query';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: PaginationQuery): PaginationQuery {
    const { page, size, infinite, ...rest } = value;

    if (infinite) {
      return rest;
    }

    const skip = page && size ? Number((page - 1) * size) : undefined;
    const take = size ? Number(size) : undefined;
    return {
      skip,
      take,
      page,
      size,
      ...rest,
    };
  }
}
