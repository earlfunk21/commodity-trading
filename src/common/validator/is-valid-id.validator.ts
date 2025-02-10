import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  isDefined,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';

export function IsValidId(
  modelName: Prisma.ModelName,
  validatorOptions?: ValidatorOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      validator: IdValidation,
      constraints: [modelName],
    });
  };
}

@ValidatorConstraint({ name: 'id', async: true })
@Injectable()
export class IdValidation implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    if (!isDefined(value)) {
      return true;
    }

    const [modelName] = args.constraints;

    const prismaModel =
      String(modelName).charAt(0).toLowerCase() + modelName.slice(1);

    const data = await this.prisma[prismaModel].count({
      where: {
        id: value,
      },
    });

    if (!data) {
      throw new UnprocessableEntityException(`${args.property} not found`);
    }

    return true;
  }
}
