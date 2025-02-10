import { AdminGuard } from '@/core/admin/admin.guard';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

export type CurrentAdmin = {
  id: string;
  userId: string;
};

export const AdminPermissionKey = 'admin-permission';

export const UseAdmin = (permission?: string) =>
  applyDecorators(
    UseGuards(AdminGuard),
    SetMetadata(AdminPermissionKey, permission),
  );

export const CurrentAdmin = createParamDecorator(
  (_: unknown, context: ExecutionContext): CurrentAdmin => {
    const request = context.switchToHttp().getRequest();
    return request.admin;
  },
);
