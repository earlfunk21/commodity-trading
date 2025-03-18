import { Pagination } from '@/common/pagination/pagination.decorator';
import { Controller, Get } from '@nestjs/common';
import { AllocationAccountService } from './allocation-account.service';

@Controller('allocation-account')
export class AllocationAccountController {
  constructor(
    private readonly allocationAccountService: AllocationAccountService,
  ) {}

  @Get('list')
  @Pagination()
  findAll() {
    return this.allocationAccountService.findAll();
  }
}
