import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, arrayMinSize, IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTradeTransactionDto {
  @IsString()
  complanId: string;

  @IsString()
  mainTokenId: string;

  @IsString({ each: true})
  @IsArray()
  @ArrayMinSize(1)
  tradeIds: string[];

  totalUnitQuantity: number;
  totalGrossSales: number;
  managementFee: number;
  capital: number;
  grossIncome: number;
  tax: number;
  netIncome: number;
  tokenValue: number;
}

export class UpdateTradeTransactionDto extends PartialType(CreateTradeTransactionDto) {}

export class FindManyTradeTransactionQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  mainTokenId?: string;
}
