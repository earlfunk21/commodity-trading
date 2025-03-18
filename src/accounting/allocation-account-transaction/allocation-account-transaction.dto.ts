import { PaginationQuery } from '@/common/pagination/pagination.query';
import { Allocation } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class FindManyAllocationAccountTransactionQuery extends PaginationQuery {
  @IsOptional()
  @IsEnum(Allocation)
  allocation?: Allocation;
}
