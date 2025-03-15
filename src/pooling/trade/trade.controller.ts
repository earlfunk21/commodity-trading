import { Pagination } from '@/common/pagination/pagination.decorator';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import {
  CreateTradeDto,
  FindManyTradeQuery,
  UpdateTradeDto,
} from './trade.dto';
import { TradeService } from './trade.service';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('create')
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.create(createTradeDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyTradeQuery) {
    return this.tradeService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyTradeQuery) {
    return this.tradeService.count(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.tradeService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradeService.update(id, updateTradeDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.tradeService.remove(id);
  }

  @Get('graph-by-main-token/:mainTokenId')
  graphByMainToken(@Param('mainTokenId') mainTokenId: string) {
    return this.tradeService.graphByMainToken(mainTokenId);
  }
}