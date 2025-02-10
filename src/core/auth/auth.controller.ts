import { CurrentUser, Public } from '@/core/auth/auth.decorator';
import { LoginDto, ResetPasswordDto } from '@/core/auth/auth.dto';
import { AuthService } from '@/core/auth/auth.service';
import { RefreshTokenGuard } from '@/core/auth/guards/refresh-token.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('get-access-token')
  @UseGuards(RefreshTokenGuard)
  getAccessToken(@CurrentUser() user: CurrentUser) {
    return this.authService.getAccessToken(user.id);
  }

  @Patch('forgot-password/:email')
  forgotPassword(@Param('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
