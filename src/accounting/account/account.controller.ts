import { Pagination } from '@/common/pagination/pagination.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindManyAccountQuery } from './account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyAccountQuery) {
    return this.accountService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyAccountQuery) {
    return this.accountService.count(query);
  }

  @Get('get/:userId')
  findOne(@Param('userId') userId: string) {
    return this.accountService.findOne(userId);
  }
}
