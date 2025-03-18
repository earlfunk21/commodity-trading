import { Module } from '@nestjs/common';
import { ComplanModule } from './complan/complan.module';
import { AccountModule } from './account/account.module';
import { AccountDepositModule } from './account-deposit/account-deposit.module';
import { AllocationAccountModule } from './allocation-account/allocation-account.module';
import { AllocationAccountTransactionModule } from './allocation-account-transaction/allocation-account-transaction.module';

@Module({
  imports: [ComplanModule, AccountModule, AccountDepositModule, AllocationAccountModule, AllocationAccountTransactionModule]
})
export class AccountingModule {}
