import { PaginationQuery } from '@/common/pagination/pagination.query';
import { IsValidId } from '@/common/validator/is-valid-id.validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsValidId('Commodity')
  commodityId: string;

  @IsBoolean()
  show: boolean;

  slug: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export class FindManyBlogQuery extends PaginationQuery {
  @IsOptional()
  @IsBoolean()
  show?: boolean;
}
