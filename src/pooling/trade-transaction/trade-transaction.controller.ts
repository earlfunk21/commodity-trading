import { Pagination } from '@/common/pagination/pagination.decorator';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import {
  CreateTradeTransactionDto,
  FindManyTradeTransactionQuery,
  UpdateTradeTransactionDto,
} from './trade-transaction.dto';
import { TradeTransactionService } from './trade-transaction.service';

@Controller('trade-transaction')
export class TradeTransactionController {
  constructor(private readonly tradeTransactionService: TradeTransactionService) {}

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

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.tradeTransactionService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTradeTransactionDto: UpdateTradeTransactionDto) {
    return this.tradeTransactionService.update(id, updateTradeTransactionDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.tradeTransactionService.remove(id);
  }
}