import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  readonly page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  readonly size?: number = 10;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly infinite?: boolean = false;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortBy: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsString()
  orderBy: string = 'createdAt';

  @IsOptional()
  @IsString()
  search?: string;

  readonly take?: number;
  readonly skip?: number;
}
