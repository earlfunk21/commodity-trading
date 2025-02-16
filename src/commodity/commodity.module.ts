import { Module } from '@nestjs/common';
import { HolderModule } from './holder/holder.module';

@Module({
  imports: [HolderModule]
})
export class CommodityModule {}
