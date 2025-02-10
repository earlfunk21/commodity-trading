import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AdminPermissionController } from './admin-permission.controller';
import { AdminPermissionService } from './admin-permission.service';

@Module({
  controllers: [AdminPermissionController],
  providers: [AdminPermissionService],
  imports: [DiscoveryModule],
})
export class AdminPermissionModule {}
