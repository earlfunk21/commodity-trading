import { Module } from '@nestjs/common';
import { AllocationAccountService } from './allocation-account.service';
import { AllocationAccountController } from './allocation-account.controller';

@Module({
  controllers: [AllocationAccountController],
  providers: [AllocationAccountService],
})
export class AllocationAccountModule {}
