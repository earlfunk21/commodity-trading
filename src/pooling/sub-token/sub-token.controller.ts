import { Pagination } from '@/common/pagination/pagination.decorator';
import { CurrentHolder, UseHolder } from '@/pooling/holder/holder.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindManySubTokenQuery } from './sub-token.dto';
import { SubTokenService } from './sub-token.service';

@Controller('sub-token')
export class SubTokenController {
  constructor(private readonly subTokenService: SubTokenService) {}

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManySubTokenQuery) {
    return this.subTokenService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManySubTokenQuery) {
    return this.subTokenService.count(query);
  }

  @Get('list-by-holder')
  @Pagination()
  @UseHolder()
  findAllByHolder(
    @Query() query: FindManySubTokenQuery,
    @CurrentHolder() holder: CurrentHolder,
  ) {
    query.holderId = holder.id;
    return this.subTokenService.findAll(query);
  }

  @Get('count-by-holder')
  @Pagination()
  @UseHolder()
  countByHolder(
    @Query() query: FindManySubTokenQuery,
    @CurrentHolder() holder: CurrentHolder,
  ) {
    query.holderId = holder.id;
    return this.subTokenService.count(query);
  }
}
