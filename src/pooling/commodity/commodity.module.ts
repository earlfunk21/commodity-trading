import { FileModule } from '@/common/file/file.module';
import { Module } from '@nestjs/common';
import { CommodityController } from './commodity.controller';
import { CommodityService } from './commodity.service';

@Module({
  controllers: [CommodityController],
  providers: [CommodityService],
  imports: [FileModule],
})
export class CommodityModule {}
