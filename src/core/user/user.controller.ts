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

  @Get('get/:id')
  @UseAdmin('get-user')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('get-current-user')
  getCurrentUser(@CurrentUser() user: CurrentUser) {
    return this.userService.findOne(user.id);
  }

  @Patch('update/:id')
  @UseAdmin('update-user')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('remove/:id')
  @UseAdmin('delete-user')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch('update-new-password')
  updateNewPassword(
    @CurrentUser() user: CurrentUser,
    @Body() updateUserDto: UpdateNewPasswordDto,
  ) {
    return this.userService.updateNewPassword(user.id, updateUserDto);
  }
}
