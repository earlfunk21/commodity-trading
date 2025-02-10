import { EmailModule } from '@/common/email/email.module';
import { AccessTokenGuard } from '@/core/auth/guards/access-token.guard';
import { RefreshTokenGuard } from '@/core/auth/guards/refresh-token.guard';
import { AccessTokenStrategy } from '@/core/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from '@/core/auth/strategies/refresh-token.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [
    AuthService,
    RefreshTokenGuard,
    AccessTokenGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
  imports: [EmailModule],
})
export class AuthModule {}
