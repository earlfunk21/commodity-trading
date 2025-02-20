import { Pagination } from '@/common/pagination/pagination.decorator';
import { UseAdmin } from '@/core/admin/admin.decorator';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateCommodityDto,
  FindManyCommodityQuery,
  UpdateCommodityDto,
} from './commodity.dto';
import { CommodityService } from './commodity.service';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Post('create')
  @UseAdmin('create-commodity')
  create(@Body() createCommodityDto: CreateCommodityDto) {
    return this.commodityService.create(createCommodityDto);
  }

  @Get('list')
  @Pagination()
  @UseAdmin('list-of-commodity')
  findAll(@Query() query: FindManyCommodityQuery) {
    return this.commodityService.findAll(query);
  }

  @Get('count')
  @Pagination()
  @UseAdmin('count-of-commodity')
  count(@Query() query: FindManyCommodityQuery) {
    return this.commodityService.count(query);
  }

  @Get('get/:slug')
  @UseAdmin('get-commodity')
  findOne(@Param('slug') slug: string) {
    return this.commodityService.findOne(slug);
  }

  @Patch('update/:id')
  @UseAdmin('update-commodity')
  update(
    @Param('id') id: string,
    @Body() updateCommodityDto: UpdateCommodityDto,
  ) {
    return this.commodityService.update(id, updateCommodityDto);
  }

  @Delete('remove/:id')
  @UseAdmin('remove-commodity')
  remove(@Param('id') id: string) {
    return this.commodityService.remove(id);
  }

  @Put('upload-image/:slug')
  @UseAdmin('upload-image-commodity')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('slug') slug: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.commodityService.uploadImage(slug, file);
  }
}
