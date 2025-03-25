import { PaginationQuery } from '@/common/pagination/pagination.query';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseTokenDto {
  @IsString()
  commodityId: string;

  @IsString()
  commodityTypeId: string;

  @IsString()
  mainTokenId: string;

  @IsNumber()
  amount: number;

  @IsString()
  holderId: string;

  mainTokenValueId: string;
  tokens: number;
}

export class CreatePurchaseTokenDtoByHolder extends OmitType(
  CreatePurchaseTokenDto,
  ['holderId'],
) {
  holderId: string;
}

export class UpdatePurchaseTokenDto extends PartialType(
  CreatePurchaseTokenDto,
) {}

export class FindManyPurchaseTokenQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  commodityId?: string;

  @IsOptional()
  @IsString()
  commodityTypeId?: string;

  @IsOptional()
  @IsString()
  mainTokenId?: string;

  @IsOptional()
  @IsString()
  holderId?: string;
}
