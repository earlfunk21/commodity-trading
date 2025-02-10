import { Prisma } from '@prisma/client';

export default Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'exists',
    model: {
      $allModels: {
        async extsts<M, A extends 'count'>(
          this: M,
          args: Prisma.Args<M, A>,
        ): Promise<boolean> {
          const context: M = Prisma.getExtensionContext(this);
          const result = await (context as any).count(args);
          return result > 0;
        },
      },
    },
  });
});
