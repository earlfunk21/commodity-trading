import { CachingService } from '@/common/caching/caching.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CurrentUser } from '@/core/auth/auth.decorator';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';

@Injectable()
export class HolderGuard extends AuthGuard('jwt') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cachingService: CachingService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const user: CurrentUser = request.user;
    const holder = await this.getHolder(user.username);

    if (!holder || user.role !== UserRole.Holder) {
      return false;
    }

    request.holder = holder;

    return true;
  }

  async getHolder(username: string) {
    const key = `holder-guard-${username}`;
    return this.cachingService.fetch(key, 10000, () =>
      this.prisma.holder.findFirst({
        where: {
          user: {
            username,
          },
        },
        select: {
          id: true,
        },
      }),
    );
  }
}
