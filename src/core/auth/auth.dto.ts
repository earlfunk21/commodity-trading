import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsAlphanumeric()
  username: string;

  @IsString()
  password: string;
}

export class ResetPasswordDto {
  @IsString()
  @Transform(({ value }: { value: string }) => bcrypt.hashSync(value, 10))
  password: string;

  @IsString()
  token: string;
}
