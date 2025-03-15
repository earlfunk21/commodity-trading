import { Pagination } from '@/common/pagination/pagination.decorator';
import { UseAdmin } from '@/core/admin/admin.decorator';
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
import { UserRole, UserStatus } from '@prisma/client';
import {
  CreateHolderDto,
  FindManyHolderQuery,
  UpdateHolderDto,
} from './holder.dto';
import { HolderService } from './holder.service';

@Controller('holder')
export class HolderController {
  constructor(private readonly holderService: HolderService) {}

  @Post('create')
  @UseAdmin('create-holder')
  create(@Body() createHolderDto: CreateHolderDto) {
    createHolderDto.user.role = UserRole.Holder;
    createHolderDto.user.status = UserStatus.Active;
    return this.holderService.create(createHolderDto);
  }

  @Get('list')
  @UseAdmin('list-of-holder')
  @Pagination()
  findAll(@Query() query: FindManyHolderQuery) {
    return this.holderService.findAll(query);
  }

  @Get('count')
  @UseAdmin('count-of-holder')
  @Pagination()
  count(@Query() query: FindManyHolderQuery) {
    return this.holderService.count(query);
  }

  @Get('get/:id')
  @UseAdmin('get-holder')
  findOne(@Param('id') id: string) {
    return this.holderService.findOne(id);
  }

  @Get('current-holder')
  @UseHolder()
  findOneByHolder(@CurrentHolder() holder: CurrentHolder) {
    return this.holderService.findOne(holder.id);
  }

  @Patch('update/:id')
  @UseAdmin('update-holder')
  update(@Param('id') id: string, @Body() updateHolderDto: UpdateHolderDto) {
    return this.holderService.update(id, updateHolderDto);
  }

  @Delete('remove/:id')
  @UseAdmin('remove-holder')
  remove(@Param('id') id: string) {
    return this.holderService.remove(id);
  }
}
