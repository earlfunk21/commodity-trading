import { Pagination } from '@/common/pagination/pagination.decorator';
import { CurrentHolder, UseHolder } from '@/pooling/holder/holder.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePurchaseTokenDto,
  CreatePurchaseTokenDtoByHolder,
  FindManyPurchaseTokenQuery,
  UpdatePurchaseTokenDto,
} from './purchase-token.dto';
import { PurchaseTokenService } from './purchase-token.service';

@Controller('purchase-token')
export class PurchaseTokenController {
  constructor(private readonly purchaseTokenService: PurchaseTokenService) {}

  @Post('create')
  create(@Body() createPurchaseTokenDto: CreatePurchaseTokenDto) {
    return this.purchaseTokenService.create(createPurchaseTokenDto);
  }

  @Post('create-by-holder')
  @UseHolder()
  createByHolder(
    @Body() createPurchaseTokenDto: CreatePurchaseTokenDtoByHolder,
    @CurrentHolder() holder: CurrentHolder,
  ) {
    createPurchaseTokenDto.holderId = holder.id;
    return this.purchaseTokenService.create(createPurchaseTokenDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyPurchaseTokenQuery) {
    return this.purchaseTokenService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyPurchaseTokenQuery) {
    return this.purchaseTokenService.count(query);
  }

  @Get('list-by-holder')
  @Pagination()
  @UseHolder()
  findAllByHolder(
    @Query() query: FindManyPurchaseTokenQuery,
    @CurrentHolder() holder: CurrentHolder,
  ) {
    query.holderId = holder.id;
    return this.purchaseTokenService.findAll(query);
  }

  @Get('count-by-holder')
  @Pagination()
  @UseHolder()
  countByHolder(
    @Query() query: FindManyPurchaseTokenQuery,
    @CurrentHolder() holder: CurrentHolder,
  ) {
    query.holderId = holder.id;
    return this.purchaseTokenService.count(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.purchaseTokenService.findOne(id);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.purchaseTokenService.remove(id);
  }
}
