import { Pagination } from '@/common/pagination/pagination.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreateTradeTransactionDto,
  FindManyTradeTransactionQuery,
} from './trade-transaction.dto';
import { TradeTransactionService } from './trade-transaction.service';

@Controller('trade-transaction')
export class TradeTransactionController {
  constructor(
    private readonly tradeTransactionService: TradeTransactionService,
  ) {}

  @Post('create')
  create(@Body() createTradeTransactionDto: CreateTradeTransactionDto) {
    return this.tradeTransactionService.create(createTradeTransactionDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyTradeTransactionQuery) {
    return this.tradeTransactionService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyTradeTransactionQuery) {
    return this.tradeTransactionService.count(query);
  }
}
