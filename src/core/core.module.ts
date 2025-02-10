import { UserModule } from '@/core/user/user.module';
import { Module } from '@nestjs/common';
import { AdminPermissionModule } from './admin-permission/admin-permission.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from '@/core/auth/auth.module';

@Module({
  imports: [
    AdminPermissionModule,
    UserModule,
    AdminModule,
    AuthModule,
  ],
})
export class CoreModule {}
