import { Module } from '@nestjs/common';
import { MainTokenValueService } from './main-token-value.service';
import { MainTokenValueController } from './main-token-value.controller';

@Module({
  controllers: [MainTokenValueController],
  providers: [MainTokenValueService],
})
export class MainTokenValueModule {}
