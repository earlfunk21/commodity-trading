import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  mainTokenId: string;

  @IsNumber()
  capital: number;

  @IsNumber()
  soldAmount: number;

  @IsNumber()
  quantity: number;

  mainTokenValueId: string;
  grossSales: number;
}

export class UpdateTradeDto extends PartialType(CreateTradeDto) {}

export class FindManyTradeQuery extends PaginationQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  processed?: boolean;

  @IsOptional()
  @IsString()
  mainTokenId?: string;
}
