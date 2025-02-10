import { UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsAlphanumeric()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }: { value: string }) => bcrypt.hashSync(value, 10))
  password: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;

  @IsEnum(UserRole)
  role: UserRole;
}
