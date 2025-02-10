import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateNewPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Transform(({ value }: { value: string }) => bcrypt.hashSync(value, 10))
  newPassword: string;
}
