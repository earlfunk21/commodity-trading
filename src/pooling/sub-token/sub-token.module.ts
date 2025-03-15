import { Module } from '@nestjs/common';
import { SubTokenService } from './sub-token.service';
import { SubTokenController } from './sub-token.controller';

@Module({
  controllers: [SubTokenController],
  providers: [SubTokenService],
})
export class SubTokenModule {}
