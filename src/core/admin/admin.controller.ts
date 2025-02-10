import { Pagination } from '@/common/pagination/pagination.decorator';
import { CurrentAdmin, UseAdmin } from '@/core/admin/admin.decorator';
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
  CreateAdminDto,
  FindManyAdminQuery,
  UpdateAdminDto,
} from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @UseAdmin('create-admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    createAdminDto.user.role = UserRole.Admin;
    createAdminDto.user.status = UserStatus.Active;
    return this.adminService.create(createAdminDto);
  }

  @Get('list')
  @UseAdmin('list-of-admin')
  @Pagination()
  findAll(@Query() query: FindManyAdminQuery) {
    return this.adminService.findAll(query);
  }

  @Get('count')
  @UseAdmin('count-of-admin')
  @Pagination()
  count(@Query() query: FindManyAdminQuery) {
    return this.adminService.count(query);
  }

  @Get('get/:id')
  @UseAdmin('get-admin')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Get('current-admin')
  @UseAdmin()
  findOneByAdmin(@CurrentAdmin() admin: CurrentAdmin) {
    return this.adminService.findOne(admin.id);
  }

  @Patch('update/:id')
  @UseAdmin('update-admin')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('remove/:id')
  @UseAdmin('remove-admin')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
