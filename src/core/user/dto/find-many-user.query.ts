import { PaginationQuery } from '@/common/pagination/pagination.query';
import { UserRole, UserStatus } from '@prisma/client';
import { IsArray, IsEnum, IsIn, IsOptional } from 'class-validator';

export class FindManyUserQuery extends PaginationQuery {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
