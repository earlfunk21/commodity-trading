import { IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  name: string;

  path: string;

  logo?: boolean;

  file: Express.Multer.File;
}
