import { PrismaService } from '@/common/prisma/prisma.service';
import {
  CreateAdminPermissionDto,
  FindManyAdminPermissionQuery,
} from '@/core/admin-permission/admin-permission.dto';
import { AdminPermissionKey } from '@/core/admin/admin.decorator';
import { Injectable, Scope } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { AdminPermission, Prisma } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class AdminPermissionService {
  constructor(
    private prisma: PrismaService,
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createAdminPermissionDto: CreateAdminPermissionDto) {
    return this.prisma.adminPermission.create({
      data: createAdminPermissionDto,
    });
  }

  findAll(query: FindManyAdminPermissionQuery) {
    const args: Prisma.AdminPermissionFindManyArgs = {
      take: query.take,
      skip: query.skip,
      orderBy: {
        [query.orderBy]: query.sortBy,
      },
      where: {
        ...this.searchQuery(query),
        adminId: query.adminId,
      },
    };

    return this.prisma.adminPermission.findMany(args);
  }

  count(query: FindManyAdminPermissionQuery) {
    const args: Prisma.AdminPermissionCountArgs = {
      where: {
        ...this.searchQuery(query),
        adminId: query.adminId,
      },
    };

    return this.prisma.adminPermission.count(args);
  }

  private searchQuery(query: FindManyAdminPermissionQuery) {
    if (!query.search) {
      return {};
    }

    const searchFields: (keyof AdminPermission)[] = ['id'];

    return {
      OR: [
        ...searchFields.map((field) => ({
          [field]: {
            search: query.search,
          },
        })),
      ],
    };
  }

  remove(id: string) {
    return this.prisma.adminPermission.delete({
      where: {
        id,
      },
    });
  }

  getOrganizedResourceAndPermissions() {
    const rersourceAndPermissions = this.getResourceAndPermissions();
    const result: { [key: string]: string[] } = {};

    rersourceAndPermissions.forEach((item) => {
      if (!result[item.resource]) {
        result[item.resource] = [];
      }
      result[item.resource].push(item.permission);
    });

    return Object.keys(result).map((resource) => ({
      resource,
      permissions: result[resource],
    }));
  }

  getResourceAndPermissions() {
    const permissions: { resource: string; permission: string }[] = [];

    const controllers = this.discoveryService.getControllers();
    controllers.forEach((wrappper) => {
      const { instance } = wrappper;
      if (instance) {
        const methods = Object.getOwnPropertyNames(
          Object.getPrototypeOf(instance),
        );
        return methods.forEach((methodName) => {
          const decoratorMetadata = this.reflector.get<string>(
            AdminPermissionKey,
            instance[methodName],
          );

          if (decoratorMetadata) {
            permissions.push({
              resource: instance.constructor.name.replace(/Controller$/, ''),
              permission: decoratorMetadata,
            });
          }
        });
      }
    });

    return permissions;
  }

  getPermissions() {
    const permissions: string[] = [];

    const controllers = this.discoveryService.getControllers();
    controllers.forEach((wrappper) => {
      const { instance } = wrappper;
      if (instance) {
        const methods = Object.getOwnPropertyNames(
          Object.getPrototypeOf(instance),
        );
        return methods.forEach((methodName) => {
          const decoratorMetadata = this.reflector.get<string>(
            AdminPermissionKey,
            instance[methodName],
          );

          if (decoratorMetadata) {
            permissions.push(decoratorMetadata);
          }
        });
      }
    });

    return permissions;
  }

  async addAllPermissionsOfAdmin(adminId: string) {
    const permissions = this.getPermissions();
    await this.removeAllPermissionsOfAdmin(adminId);
    return this.prisma.adminPermission.createMany({
      data: permissions.map((permission) => ({
        adminId,
        permission,
      })),
    });
  }

  removeAllPermissionsOfAdmin(adminId: string) {
    return this.prisma.adminPermission.deleteMany({
      where: {
        adminId,
      },
    });
  }
}
