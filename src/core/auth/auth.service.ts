import { EmailService } from '@/common/email/email.service';
import ForgotPasswordHTML from '@/common/email/templates/forgot-password';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CurrentUser } from '@/core/auth/auth.decorator';
import { LoginDto, ResetPasswordDto } from '@/core/auth/auth.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
      select: {
        id: true,
        status: true,
        role: true,
        password: true,
      },
    });
    if (!user) {
      throw new BadRequestException('Username not found');
    }

    if (user.status === 'Inactive') {
      throw new BadRequestException('User not yet activated');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }

    return this.generateAuthTokens({
      id: user.id,
      role: user.role,
    });
  }

  async getAccessToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        status: true,
        role: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    if (user.status === 'Inactive') {
      throw new UnauthorizedException('User not yet activated');
    }

    return this.generateAuthTokens({
      id: user.id,
      role: user.role,
    });
  }

  async generateAuthTokens(user: CurrentUser) {
    const expiresIn = 1 * 60 * 60 * 1000;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          role: user.role,
        },
        {
          expiresIn,
          secret: process.env.JWT_ACCESS_SECRET,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
        },
        {
          expiresIn: '1d',
          secret: process.env.JWT_REFRESH_SECRET,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + expiresIn),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
      },
    );

    const html = ForgotPasswordHTML(token);

    await this.emailService.send(email, 'Reset your password', html);

    return user;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        resetPasswordDto.token,
        {
          secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
        },
      );

      return this.prisma.user.update({
        where: {
          id: payload.sub,
        },
        data: {
          password: resetPasswordDto.password,
        },
        omit: {
          password: true,
        },
      });
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }
}
