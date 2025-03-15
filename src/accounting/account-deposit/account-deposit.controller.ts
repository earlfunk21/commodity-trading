import { Pagination } from '@/common/pagination/pagination.decorator';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateAccountDepositDto,
  FindManyAccountDepositQuery,
} from './account-deposit.dto';
import { AccountDepositService } from './account-deposit.service';

@Controller('account-deposit')
export class AccountDepositController {
  constructor(private readonly accountDepositService: AccountDepositService) {}

  @Post('create')
  create(@Body() createAccountDepositDto: CreateAccountDepositDto) {
    return this.accountDepositService.create(createAccountDepositDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyAccountDepositQuery) {
    return this.accountDepositService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyAccountDepositQuery) {
    return this.accountDepositService.count(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.accountDepositService.findOne(id);
  }
}
