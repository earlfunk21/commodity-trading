import { IdValidation } from '@/common/validator/is-valid-id.validator';
import { Module } from '@nestjs/common';

@Module({
  providers: [IdValidation],
})
export class ValidatorModule {}
