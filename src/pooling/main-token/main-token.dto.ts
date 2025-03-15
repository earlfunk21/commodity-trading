import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMainTokenDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  commodityId: string;

  @IsString()
  commodityTypeId: string;

  @IsNumber()
  totalValue: number;

  @IsNumber()
  unitValue: number;

  @IsString()
  origin: string;

  @IsString()
  performanceBondNumber: string;

  @IsString()
  insurerCompany: string;

  @IsString()
  insurancePolicyNumber: string;

  @IsString()
  certificateOfStockNumber: string;

  @IsString()
  CADTNumber: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  tradingStart: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  tradingEnd: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  poolingStart: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  poolingEnd: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  tradingDuration: Date;

  @IsString()
  unitType: string;

  @IsString()
  complanId: string;

  quantity: number;

  totalTokens: number;

  lastValue: number;

  currentValue: number;
}

export class UpdateMainTokenDto extends PartialType(CreateMainTokenDto) {}

export class FindManyMainTokenQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  commodityId?: string;

  @IsOptional()
  @IsString()
  commodityTypeId?: string;

  @IsOptional()
  @IsString()
  holderId?: string;
}
