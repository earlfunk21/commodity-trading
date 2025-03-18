import { Module } from '@nestjs/common';
import { AllocationAccountTransactionService } from './allocation-account-transaction.service';
import { AllocationAccountTransactionController } from './allocation-account-transaction.controller';

@Module({
  controllers: [AllocationAccountTransactionController],
  providers: [AllocationAccountTransactionService],
})
export class AllocationAccountTransactionModule {}
