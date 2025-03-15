import { Pagination } from '@/common/pagination/pagination.decorator';
import { UseAdmin } from '@/core/admin/admin.decorator';
import { Public } from '@/core/auth/auth.decorator';
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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  CreateCommodityTypeDto,
  FindManyCommodityTypeQuery,
  UpdateCommodityTypeDto,
} from './commodity-type.dto';
import { CommodityTypeService } from './commodity-type.service';

@Controller('commodity-type')
export class CommodityTypeController {
  constructor(private readonly commodityTypeService: CommodityTypeService) {}

  @Post('create')
  @UseAdmin('create-commodity-type')
  create(@Body() createCommodityTypeDto: CreateCommodityTypeDto) {
    return this.commodityTypeService.create(createCommodityTypeDto);
  }

  @Get('list')
  @Pagination()
  @Public()
  findAll(@Query() query: FindManyCommodityTypeQuery) {
    return this.commodityTypeService.findAll(query);
  }

  @Get('count')
  @Pagination()
  @Public()
  count(@Query() query: FindManyCommodityTypeQuery) {
    return this.commodityTypeService.count(query);
  }

  @Get('get/:slug')
  findOne(@Param('slug') slug: string) {
    return this.commodityTypeService.findOne(slug);
  }

  @Patch('update/:id')
  @UseAdmin('update-commodity-type')
  update(
    @Param('id') id: string,
    @Body() updateCommodityTypeDto: UpdateCommodityTypeDto,
  ) {
    return this.commodityTypeService.update(id, updateCommodityTypeDto);
  }

  @Delete('remove/:id')
  @UseAdmin('remove-commodity-type')
  remove(@Param('id') id: string) {
    return this.commodityTypeService.remove(id);
  }

  @Put('upload-images/:slug')
  @UseAdmin('upload-image-commodity')
  @UseInterceptors(FilesInterceptor('files'))
  uploadImage(
    @Param('slug') slug: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.commodityTypeService.uploadImages(slug, files);
  }

  @Delete('remove-image/:slug/:image')
  @UseAdmin('remove-image-commodity')
  removeImage(@Param('slug') slug: string, @Param('image') image: string) {
    return this.commodityTypeService.deleteImage(slug, image);
  }

  @Put('upload-videos/:slug')
  @UseAdmin('upload-video-commodity')
  @UseInterceptors(FilesInterceptor('files'))
  uploadVideo(
    @Param('slug') slug: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'video/*' })],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.commodityTypeService.uploadVideos(slug, files);
  }

  @Delete('remove-video/:slug/:video')
  @UseAdmin('remove-video-commodity')
  removeVideo(@Param('slug') slug: string, @Param('video') video: string) {
    return this.commodityTypeService.deleteVideo(slug, video);
  }
}
