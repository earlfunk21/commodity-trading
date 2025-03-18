import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateComplanDto {
  @IsString()
  name: string;

  @IsNumber()
  commission: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  referralCommission: number;

  @IsNumber()
  pendingReferralCommission: number;

  @IsNumber()
  managementFee: number;

  @IsNumber()
  pendingManagementFee: number;

  @IsNumber()
  capital: number;

  @IsNumber()
  itManagement: number;

  @IsNumber()
  partnersManagement: number;

  @IsNumber()
  tpcpiReferrerManagement: number;

  @IsNumber()
  tpcpiManagement: number;
}

export class UpdateComplanDto extends PartialType(CreateComplanDto) {}

export class FindManyComplanQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  complanId?: string;
}
