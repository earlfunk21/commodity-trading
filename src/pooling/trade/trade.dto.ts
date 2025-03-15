import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  mainTokenId: string;

  @IsNumber()
  totalTrade: number;

  @IsNumber()
  capital: number;

  @IsNumber()
  unitValue: number;

  @IsNumber()
  soldValue: number;

  @IsNumber()
  quantity: number;

  @IsString()
  complanId: string;

  grossSales: number;
  managementFee: number;
  grossIncome: number;
  tax: number;
  netIncome: number;
  tokenValue: number;
}

export class UpdateTradeDto extends PartialType(CreateTradeDto) {}

export class FindManyTradeQuery extends PaginationQuery {}
