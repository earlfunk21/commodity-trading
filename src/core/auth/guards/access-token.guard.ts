import { CachingService } from '@/common/caching/caching.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import {
  CurrentUser,
  IS_PUBLIC_KEY,
  ROLE_KEY,
} from '@/core/auth/auth.decorator';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole, UserStatus } from '@prisma/client';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly cachingService: CachingService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.getReflector<boolean>(context, IS_PUBLIC_KEY);
    if (isPublic) {
      return true;
    }
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const user: CurrentUser = request.user;
    const userStatus = await this.getUserStatus(user.id);

    if (!userStatus) {
      return false;
    }

    if (userStatus !== UserStatus.Active) {
      return false;
    }

    const role = this.getReflector<UserRole>(context, ROLE_KEY);

    if (role && role !== user.role) {
      return false;
    }

    return true;
  }

  getReflector<T>(context: ExecutionContext, key: string) {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  getUserStatus(id: string) {
    const key = `access-token-guard-${id}`;
    return this.cachingService.fetch(key, 10000, async () => {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          status: true,
        },
      });

      if (!user) {
        return null;
      }

      return user.status;
    });
  }
}
