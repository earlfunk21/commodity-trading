import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { DepositStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDepositDto {
  @IsString()
  userId: string;

  @IsNumber()
  amount: number;

  @IsEnum(DepositStatus)
  status: DepositStatus;
}

export class UpdateAccountDepositDto extends PartialType(
  CreateAccountDepositDto,
) {}

export class FindManyAccountDepositQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsEnum(DepositStatus)
  status?: DepositStatus;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  username?: string;
}
