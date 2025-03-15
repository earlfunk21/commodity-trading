import { Module } from '@nestjs/common';
import { ComplanService } from './complan.service';
import { ComplanController } from './complan.controller';

@Module({
  controllers: [ComplanController],
  providers: [ComplanService],
})
export class ComplanModule {}
