import { PaginationQuery } from '@/common/pagination/pagination.query';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMainTokenValueDto {
  @IsString()
  commodityId: string;

  @IsString()
  commodityTypeId: string;

  @IsString()
  mainTokenId: string;

  @IsNumber()
  unitValue: number;

  totalValue: number;

  volume: number;
}

export class FindManyMainTokenValueQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  mainTokenId?: string;

  @IsOptional()
  @IsString()
  mainTokenCode?: string;

  @IsOptional()
  @IsString()
  commodityId?: string;

  @IsOptional()
  @IsString()
  commoditySlug?: string;

  @IsOptional()
  @IsString()
  commodityTypeId?: string;

  @IsOptional()
  @IsString()
  commodityTypeSlug?: string;
}
