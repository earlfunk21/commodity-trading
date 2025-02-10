import { PaginationQuery } from '@/common/pagination/pagination.query';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateAdminPermissionDto {
  @IsString()
  permission: string;

  @IsString()
  adminId: string;
}

export class FindManyAdminPermissionQuery extends PaginationQuery {
  @IsString()
  @IsOptional()
  adminId?: string;
}

export class UpdateAdminPermissionDto extends PartialType(
  CreateAdminPermissionDto,
) {}
