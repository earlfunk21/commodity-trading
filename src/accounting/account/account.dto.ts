import { PaginationQuery } from '@/common/pagination/pagination.query';
import { IsOptional, IsString } from 'class-validator';

export class FindManyAccountQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  userId?: string;
}
