import { Module } from '@nestjs/common';
import { HolderModule } from './holder/holder.module';
import { CommodityModule } from './commodity/commodity.module';
import { CommodityTypeModule } from './commodity-type/commodity-type.module';

@Module({
  imports: [HolderModule, CommodityModule, CommodityTypeModule]
})
export class PullingModule {}
