import { PaginationQuery } from '@/common/pagination/pagination.query';
import { CreateUserDto } from '@/core/user/dto/create-user.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserRole, UserStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateHolderUserDto extends OmitType(CreateUserDto, [
  'role',
  'status',
] as const) {
  role: UserRole;
  status: UserStatus;
}

export class CreateHolderDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @Type(() => CreateHolderUserDto)
  @ValidateNested()
  user: CreateHolderUserDto;
}

export class FindManyHolderQuery extends PaginationQuery {}

export class UpdateHolderDto extends PartialType(
  OmitType(CreateHolderDto, ['user'] as const),
) {}
