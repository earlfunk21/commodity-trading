import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';

import { CachingService } from '@/common/caching/caching.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AdminPermissionKey } from '@/core/admin/admin.decorator';
import { CurrentUser } from '@/core/auth/auth.decorator';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly cachingService: CachingService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const user: CurrentUser = request.user;

    const admin = await this.getAdmin(user.username);

    if (!admin) {
      throw new ForbiddenException('You do not have admin privileges.');
    }

    request.admin = admin;

    if (user.role === UserRole.Owner) {
      return true;
    }

    if (user.role !== UserRole.Admin) {
      throw new ForbiddenException('Invalid role for admin access.');
    }

    const adminPermission = this.getReflector<string>(
      context,
      AdminPermissionKey,
    );

    if (!adminPermission) {
      return true;
    }

    const hasPermission = await this.getAdminPermissionExists(
      admin.id,
      adminPermission,
    );
    if (!hasPermission) {
      throw new ForbiddenException(
        `Missing required permission: ${adminPermission}`,
      );
    }

    return true;
  }

  private getReflector<T>(context: ExecutionContext, key: string): T {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getAdmin(username: string) {
    const key = `admin:${username}`;
    return this.cachingService.fetch(key, 30000, async () =>
      this.prisma.admin.findFirst({
        where: {
          user: {
            username,
          },
        },
        select: {
          id: true,
          userId: true,
        },
      }),
    );
  }

  private getAdminPermissionExists(adminId: string, permission: string) {
    const key = `${adminId}/${permission}/admin`;
    return this.cachingService.fetch<boolean>(key, 10000, () =>
      this.prisma.adminPermission.extsts({
        where: {
          id: adminId,
          permission,
        },
      }),
    );
  }
}
