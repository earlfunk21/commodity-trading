import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    const jwtRefreshSecret = configService.getOrThrow<string>('SECRET_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refreshToken'),
      secretOrKey: jwtRefreshSecret,
    });
  }

  validate(payload: any) {
    return {
      id: payload.id,
    };
  }
}
