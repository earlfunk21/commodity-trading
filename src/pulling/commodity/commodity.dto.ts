import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateCommodityDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  slug: string;
}

export class UpdateCommodityDto extends PartialType(CreateCommodityDto) {}

export class FindManyCommodityQuery extends PaginationQuery {}
