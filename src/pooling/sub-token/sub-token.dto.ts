import { PaginationQuery } from '@/common/pagination/pagination.query';
import { IsOptional, IsString } from 'class-validator';

export class FindManySubTokenQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  holderId?: string;
}
