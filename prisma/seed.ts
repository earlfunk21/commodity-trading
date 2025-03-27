import { Allocation, PrismaClient, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.admin.findFirst();
  if (!adminExists) {
    await prisma.admin.create({
      data: {
        firstName: process.env.SUPER_ADMIN_FIRST_NAME!,
        lastName: process.env.SUPER_ADMIN_LAST_NAME!,
        user: {
          create: {
            username: process.env.SUPER_ADMIN_USERNAME!,
            email: process.env.SUPER_ADMIN_EMAIL!,
            password: bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD!, 10),
            role: UserRole.Admin,
            status: UserStatus.Active,
          },
        },
        permissions: {
          create: {
            permission: '_all_',
          },
        },
      },
    });
  }

  const allocations = Object.keys(Allocation).map((key) => Allocation[key]);

  for (const allocation of allocations) {
    const accountExists = await prisma.allocationAccount.findFirst({
      where: { allocation },
    });

    if (!accountExists) {
      await prisma.allocationAccount.create({
        data: {
          allocation,
          balance: 0,
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
