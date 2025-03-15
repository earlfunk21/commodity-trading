import { Pagination } from '@/common/pagination/pagination.decorator';
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
  CreateComplanDto,
  FindManyComplanQuery,
  UpdateComplanDto,
} from './complan.dto';
import { ComplanService } from './complan.service';

@Controller('complan')
export class ComplanController {
  constructor(private readonly complanService: ComplanService) {}

  @Post('create')
  create(@Body() createComplanDto: CreateComplanDto) {
    return this.complanService.create(createComplanDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyComplanQuery) {
    return this.complanService.findAll(query);
  }

  @Get('count')
  @Pagination()
  count(@Query() query: FindManyComplanQuery) {
    return this.complanService.count(query);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.complanService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateComplanDto: UpdateComplanDto,
  ) {
    return this.complanService.update(id, updateComplanDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.complanService.remove(id);
  }
}
