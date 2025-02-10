import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';

export type CurrentUser = {
  id: string;
  role: UserRole;
};

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): CurrentUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLE_KEY = 'Role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
