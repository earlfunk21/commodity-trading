import { Pagination } from '@/common/pagination/pagination.decorator';
import { UseAdmin } from '@/core/admin/admin.decorator';
import { CurrentUser } from '@/core/auth/auth.decorator';
import { FindManyUserQuery } from '@/core/user/dto/find-many-user.query';
import { UpdateNewPasswordDto } from '@/core/user/dto/update-new-password.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @UseAdmin('list-of-users')
  @Pagination()
  findAll(@Query() query: FindManyUserQuery) {
    return this.userService.findAll(query);
  }

  @Get('count')
  @UseAdmin('count-of-users')
  @Pagination()
  count(@Query() query: FindManyUserQuery) {
    return this.userService.count(query);
  }

  @Get('get/:username')
  @UseAdmin('get-user')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Get('get-current-user')
  getCurrentUser(@CurrentUser() user: CurrentUser) {
    return this.userService.findOne(user.username);
  }

  @Patch('update/:username')
  @UseAdmin('update-user')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(username, updateUserDto);
  }

  @Patch('update-new-password')
  updateNewPassword(
    @CurrentUser() user: CurrentUser,
    @Body() updateUserDto: UpdateNewPasswordDto,
  ) {
    return this.userService.updateNewPassword(user.username, updateUserDto);
  }
}
