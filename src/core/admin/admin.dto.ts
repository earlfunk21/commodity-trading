import { PaginationQuery } from '@/common/pagination/pagination.query';
import { CreateUserDto } from '@/core/user/dto/create-user.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserRole, UserStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateAdminUserDto extends OmitType(CreateUserDto, [
  'role',
  'status',
] as const) {
  role: UserRole;
  status: UserStatus;
}

export class CreateAdminDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @Type(() => CreateAdminUserDto)
  @ValidateNested()
  user: CreateAdminUserDto;
}

export class FindManyAdminQuery extends PaginationQuery {}

export class UpdateAdminDto extends PartialType(
  OmitType(CreateAdminDto, ['user'] as const),
) {}
