import { Pagination } from '@/common/pagination/pagination.decorator';
import {
  CreateAdminPermissionDto,
  FindManyAdminPermissionQuery,
} from '@/core/admin-permission/admin-permission.dto';
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
import { AdminPermissionService } from './admin-permission.service';

@Controller('admin-permission')
export class AdminPermissionController {
  constructor(
    private readonly adminPermissionService: AdminPermissionService,
  ) {}

  @Post('create')
  @UseAdmin('create-admin-permission')
  create(@Body() createAdminPermissionDto: CreateAdminPermissionDto) {
    return this.adminPermissionService.create(createAdminPermissionDto);
  }

  @Get('list')
  @UseAdmin('list-of-admin-permission')
  @Pagination()
  findAll(@Query() query: FindManyAdminPermissionQuery) {
    return this.adminPermissionService.findAll(query);
  }

  @Get('list-by-admin')
  @UseAdmin()
  @Pagination()
  findAllByAdmin(
    @Query() query: FindManyAdminPermissionQuery,
    @CurrentAdmin() admin: CurrentAdmin,
  ) {
    query.adminId = admin.id;
    return this.adminPermissionService.findAll(query);
  }

  @Get('count')
  @UseAdmin('count-of-admin-permission')
  @Pagination()
  count(@Query() query: FindManyAdminPermissionQuery) {
    return this.adminPermissionService.count(query);
  }

  @Delete('remove/:id')
  @UseAdmin('remove-admin-permission')
  remove(@Param('id') id: string) {
    return this.adminPermissionService.remove(id);
  }

  @Get('permissions')
  @UseAdmin('list-of-permission')
  getPermissions() {
    return this.adminPermissionService.getOrganizedResourceAndPermissions();
  }

  @Patch('add-all-permissions-of-admin/:adminId')
  @UseAdmin('add-all-admin-permission')
  addAllPermissionsOfAdmin(@Param('adminId') adminId: string) {
    return this.adminPermissionService.addAllPermissionsOfAdmin(adminId);
  }

  @Delete('remove-all-permissions-of-admin/:adminId')
  @UseAdmin('remove-all-admin-permission')
  removeAllPermissionsOfAdmin(@Param('adminId') adminId: string) {
    return this.adminPermissionService.removeAllPermissionsOfAdmin(adminId);
  }
}
