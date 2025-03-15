import { HolderGuard } from '@/pooling/holder/holder.guard';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

export type CurrentHolder = {
  id: string;
  userId: string;
};

export const HolderPermissionKey = 'holder-permission';

export const UseHolder = (permission?: string) =>
  applyDecorators(
    UseGuards(HolderGuard),
    SetMetadata(HolderPermissionKey, permission),
  );

export const CurrentHolder = createParamDecorator(
  (_: unknown, context: ExecutionContext): CurrentHolder => {
    const request = context.switchToHttp().getRequest();
    return request.holder;
  },
);
