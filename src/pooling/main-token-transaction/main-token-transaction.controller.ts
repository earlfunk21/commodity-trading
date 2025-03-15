import { Pagination } from '@/common/pagination/pagination.decorator';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import {
  CreateMainTokenTransactionDto,
  FindManyMainTokenTransactionQuery,
  UpdateMainTokenTransactionDto,
} from './main-token-transaction.dto';
import { MainTokenTransactionService } from './main-token-transaction.service';

@Controller('main-token-transaction')
export class MainTokenTransactionController {
  constructor(private readonly mainTokenTransactionService: MainTokenTransactionService) {}

  @Post('create')
  create(@Body() createMainTokenTransactionDto: CreateMainTokenTransactionDto) {
    return this.mainTokenTransactionService.create(createMainTokenTransactionDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyMainTokenTransactionQuery) {
    return this.mainTokenTransactionService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyMainTokenTransactionQuery) {
    return this.mainTokenTransactionService.count(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.mainTokenTransactionService.findOne(id);
  }
}