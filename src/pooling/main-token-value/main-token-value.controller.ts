import { Pagination } from '@/common/pagination/pagination.decorator';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateMainTokenValueDto,
  FindManyMainTokenValueQuery,
} from './main-token-value.dto';
import { MainTokenValueService } from './main-token-value.service';

@Controller('main-token-value')
export class MainTokenValueController {
  constructor(private readonly mainTokenValueService: MainTokenValueService) {}

  @Post('create')
  create(@Body() createMainTokenValueDto: CreateMainTokenValueDto) {
    return this.mainTokenValueService.create(createMainTokenValueDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyMainTokenValueQuery) {
    return this.mainTokenValueService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyMainTokenValueQuery) {
    return this.mainTokenValueService.count(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.mainTokenValueService.findOne(id);
  }

  @Get('token-values-by-hour')
  tokenValuesByHour() {
    return this.mainTokenValueService.tokenValuesByHour();
  }

  @Get('token-values-by-day')
  tokenValuesByDay() {
    return this.mainTokenValueService.tokenValuesByDay();
  }

  @Get('token-values-by-month')
  tokenValuesByMonth() {
    return this.mainTokenValueService.tokenValuesByMonth();
  }

  @Get('token-values-by-year')
  tokenValuesByYear() {
    return this.mainTokenValueService.tokenValuesByYear();
  }
}
