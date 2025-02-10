import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
  imports: [HttpModule],
  exports: [FileService],
})
export class FileModule {}
