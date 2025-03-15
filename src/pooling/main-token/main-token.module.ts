import { Module } from '@nestjs/common';
import { MainTokenService } from './main-token.service';
import { MainTokenController } from './main-token.controller';

@Module({
  controllers: [MainTokenController],
  providers: [MainTokenService],
})
export class MainTokenModule {}
