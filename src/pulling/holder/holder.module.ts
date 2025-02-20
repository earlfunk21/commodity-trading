import { Module } from '@nestjs/common';
import { HolderService } from './holder.service';
import { HolderController } from './holder.controller';

@Module({
  controllers: [HolderController],
  providers: [HolderService],
})
export class HolderModule {}
