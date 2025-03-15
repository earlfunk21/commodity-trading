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
  @Public()
  findAll(@Query() query: FindManyMainTokenQuery) {
    return this.mainTokenService.findAll(query);
  }

  @Get('count')
  @Pagination()
  @Public()
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
}
