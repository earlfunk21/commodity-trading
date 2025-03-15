import { PaginationQuery } from '@/common/pagination/pagination.query';
import { IsValidId } from '@/common/validator/is-valid-id.validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateCommodityTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsValidId('Commodity')
  commodityId: string;

  slug: string;
}

export class UpdateCommodityTypeDto extends PartialType(
  CreateCommodityTypeDto,
) {}

export class FindManyCommodityTypeQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  commoditySlug?: string;

  @IsOptional()
  @IsString()
  commodityId?: string;
}
