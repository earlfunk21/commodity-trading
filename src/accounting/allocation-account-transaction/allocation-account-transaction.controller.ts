import { Pagination } from '@/common/pagination/pagination.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { FindManyAllocationAccountTransactionQuery } from './allocation-account-transaction.dto';
import { AllocationAccountTransactionService } from './allocation-account-transaction.service';

@Controller('allocation-account-transaction')
export class AllocationAccountTransactionController {
  constructor(
    private readonly allocationAccountTransactionService: AllocationAccountTransactionService,
  ) {}

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyAllocationAccountTransactionQuery) {
    return this.allocationAccountTransactionService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyAllocationAccountTransactionQuery) {
    return this.allocationAccountTransactionService.count(query);
  }
}
