import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateMainTokenTransactionDto {
  complanId: string;
  amount: number;
  userId: string;
  mainTokenId: string;
}

export class UpdateMainTokenTransactionDto extends PartialType(
  CreateMainTokenTransactionDto,
) {}

export class FindManyMainTokenTransactionQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  complanId?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @IsOptional()
  @IsString()
  tradeId?: string;

  @IsOptional()
  mainTokenCode?: string;
}
