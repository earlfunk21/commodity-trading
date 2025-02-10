import { InternalDisabledLogger } from '@/common/logger/internal-disabled.logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new InternalDisabledLogger(),
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const error = errors[0];
        const result = {
          message: findFirstConstraintMessage(error),
        };
        return new BadRequestException(result);
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(compression({ level: 1 }));
  app.enableShutdownHooks();
  const port = configService.getOrThrow('PORT');
  await app.listen(port);
}

bootstrap();

const findFirstConstraintMessage = (error: ValidationError) => {
  // Check if the current error has constraints
  if (error.constraints) {
    // Return the first constraint message
    return error.constraints[Object.keys(error.constraints)[0]];
  }

  // If the current error has children, recursively search through them
  if (error.children && error.children.length > 0) {
    for (const child of error.children) {
      const message = findFirstConstraintMessage(child);
      if (message) return message;
    }
  }

  // If no constraints found, return null
  return null;
};
