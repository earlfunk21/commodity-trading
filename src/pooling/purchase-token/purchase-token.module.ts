import { Module } from '@nestjs/common';
import { PurchaseTokenController } from './purchase-token.controller';
import { PurchaseTokenService } from './purchase-token.service';
import { MainTokenTransactionModule } from '@/pooling/main-token-transaction/main-token-transaction.module';

@Module({
  controllers: [PurchaseTokenController],
  providers: [PurchaseTokenService],
  imports: [MainTokenTransactionModule],
})
export class PurchaseTokenModule {}
