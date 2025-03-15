import { Module } from '@nestjs/common';
import { ComplanModule } from './complan/complan.module';
import { AccountModule } from './account/account.module';
import { AccountDepositModule } from './account-deposit/account-deposit.module';

@Module({
  imports: [ComplanModule, AccountModule, AccountDepositModule]
})
export class AccountingModule {}
