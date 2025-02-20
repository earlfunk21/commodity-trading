import { FileModule } from '@/common/file/file.module';
import { Module } from '@nestjs/common';
import { CommodityTypeController } from './commodity-type.controller';
import { CommodityTypeService } from './commodity-type.service';

@Module({
  controllers: [CommodityTypeController],
  providers: [CommodityTypeService],
  imports: [FileModule],
})
export class CommodityTypeModule {}
