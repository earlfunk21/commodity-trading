import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, arrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateTradeTransactionDto {
  @IsString()
  complanId: string;

  @IsNumber()
  amount: number;

  @IsString()
  mainTokenId: string;

  @IsString({ each: true})
  @IsArray()
  @ArrayMinSize(1)
  tradeIds: string[];
}

export class UpdateTradeTransactionDto extends PartialType(CreateTradeTransactionDto) {}

export class FindManyTradeTransactionQuery extends PaginationQuery {}
