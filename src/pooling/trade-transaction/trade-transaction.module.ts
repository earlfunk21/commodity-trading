import { Module } from '@nestjs/common';
import { TradeTransactionService } from './trade-transaction.service';
import { TradeTransactionController } from './trade-transaction.controller';

@Module({
  controllers: [TradeTransactionController],
  providers: [TradeTransactionService],
})
export class TradeTransactionModule {}
