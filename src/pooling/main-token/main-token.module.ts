import { MainTokenTransactionModule } from '@/pooling/main-token-transaction/main-token-transaction.module';
import { Module } from '@nestjs/common';
import { MainTokenController } from './main-token.controller';
import { MainTokenService } from './main-token.service';

@Module({
  controllers: [MainTokenController],
  providers: [MainTokenService],
  imports: [MainTokenTransactionModule],
})
export class MainTokenModule {}
