import exists from '@/common/prisma/extensions/exists';
import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export const prismaExtendedClient = (prismaClient: PrismaClient) =>
  prismaClient.$extends(exists);

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return prismaExtendedClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => ReturnType<typeof prismaExtendedClient>;

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger: Logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log('Database connected');
    await this.$connect();
  }

  async onApplicationShutdown() {
    this.logger.log('Database connection closed');
    await this.$disconnect();
  }
}
