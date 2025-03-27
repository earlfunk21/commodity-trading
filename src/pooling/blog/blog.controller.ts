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
import { CreateBlogDto, FindManyBlogQuery, UpdateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('list')
  @Pagination()
  findAll(@Query() query: FindManyBlogQuery) {
    return this.blogService.findAll(query);
  }

  @Get('list-by-public')
  @Pagination()
  @Public()
  findAllByPublic(@Query() query: FindManyBlogQuery) {
    query.show = true;
    return this.blogService.findAll(query);
  }

  @Get('get/:slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
