import { Module } from '@nestjs/common';
import { AccountDepositService } from './account-deposit.service';
import { AccountDepositController } from './account-deposit.controller';

@Module({
  controllers: [AccountDepositController],
  providers: [AccountDepositService],
})
export class AccountDepositModule {}
