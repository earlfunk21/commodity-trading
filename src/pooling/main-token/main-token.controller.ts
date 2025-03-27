import { Pagination } from '@/common/pagination/pagination.decorator';
import { Public } from '@/core/auth/auth.decorator';
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
  CreateMainTokenDto,
  FindManyMainTokenQuery,
  UpdateMainTokenDto,
} from './main-token.dto';
import { MainTokenService } from './main-token.service';

@Controller('main-token')
export class MainTokenController {
  constructor(private readonly mainTokenService: MainTokenService) {}

  @Post('create')
  create(@Body() createMainTokenDto: CreateMainTokenDto) {
    return this.mainTokenService.create(createMainTokenDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyMainTokenQuery) {
    return this.mainTokenService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyMainTokenQuery) {
    return this.mainTokenService.count(query);
  }

  @Get('get/:code')
  @Public()
  findOne(@Param('code') code: string) {
    return this.mainTokenService.findOne(code);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMainTokenDto: UpdateMainTokenDto,
  ) {
    return this.mainTokenService.update(id, updateMainTokenDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.mainTokenService.remove(id);
  }

  @Patch('released-referral-commission/:id')
  releasedReferralCommission(@Param('id') id: string) {
    return this.mainTokenService.releasedReferralCommission(id);
  }

  @Patch('released-management-fee/:id')
  releasedManagementFee(@Param('id') id: string) {
    return this.mainTokenService.releasedManagementFee(id);
  }
}
