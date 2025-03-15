import { PaginationQuery } from '@/common/pagination/pagination.query';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PurchaseStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseTokenDto {
  @IsString()
  mainTokenId: string;

  @IsNumber()
  amount: number;

  @IsString()
  holderId: string;

  capital: number;
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

  @IsOptional()
  @IsEnum(PurchaseStatus)
  status?: PurchaseStatus;
}
