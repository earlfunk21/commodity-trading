import { Module } from '@nestjs/common';
import { CommodityTypeModule } from './commodity-type/commodity-type.module';
import { CommodityModule } from './commodity/commodity.module';
import { HolderModule } from './holder/holder.module';
import { MainTokenModule } from './main-token/main-token.module';
import { PurchaseTokenModule } from './purchase-token/purchase-token.module';
import { TradeModule } from './trade/trade.module';
import { SubTokenModule } from './sub-token/sub-token.module';
import { MainTokenTransactionModule } from './main-token-transaction/main-token-transaction.module';
import { TradeTransactionModule } from './trade-transaction/trade-transaction.module';
import { MainTokenValueModule } from './main-token-value/main-token-value.module';

@Module({
  imports: [
    HolderModule,
    CommodityModule,
    CommodityTypeModule,
    MainTokenModule,
    PurchaseTokenModule,
    TradeModule,
    SubTokenModule,
    MainTokenTransactionModule,
    TradeTransactionModule,
    MainTokenValueModule,
  ],
})
export class poolingModule {}
