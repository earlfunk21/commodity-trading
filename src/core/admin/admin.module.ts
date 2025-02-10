import { UserModule } from '@/core/user/user.module';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [UserModule],
})
export class AdminModule {}
