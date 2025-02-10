import { AllExceptionsFilter } from '@/common/filter/all-exceptions.filter';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { ValidatorModule } from '@/common/validator/validator.module';
import { AccessTokenGuard } from '@/core/auth/guards/access-token.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CachingModule } from './common/caching/caching.module';
import { EmailModule } from './common/email/email.module';
import { FileModule } from './common/file/file.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>('REDIS_USERNAME');
        const password = configService.get<string>('REDIS_PASSWORD');
        const host = configService.getOrThrow<string>('REDIS_HOST');
        const port = configService.getOrThrow<number>('REDIS_PORT');

        const store = await redisStore({
          username,
          password,
          socket: {
            host,
            port,
          },
        });

        return {
          store,
          ttl: 10000,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    PrismaModule,
    ValidatorModule,
    CachingModule,
    CoreModule,
    EmailModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
