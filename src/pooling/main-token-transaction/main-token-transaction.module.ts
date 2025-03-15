import { Module } from '@nestjs/common';
import { MainTokenTransactionService } from './main-token-transaction.service';
import { MainTokenTransactionController } from './main-token-transaction.controller';

@Module({
  controllers: [MainTokenTransactionController],
  providers: [MainTokenTransactionService],
  exports: [MainTokenTransactionService],
})
export class MainTokenTransactionModule {}
