import {
  AccountType,
  Allocation,
  PrismaClient,
  UserRole,
  UserStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.admin.findFirst();
  if (!adminExists) {
    await prisma.admin.create({
      data: {
        firstName: process.env.OWNER_FIRST_NAME!,
        lastName: process.env.OWNER_LAST_NAME!,
        user: {
          create: {
            username: process.env.OWNER_USERNAME!,
            email: process.env.OWNER_EMAIL!,
            password: bcrypt.hashSync(process.env.OWNER_PASSWORD!, 10),
            role: UserRole.Owner,
            status: UserStatus.Active,
          },
        },
      },
    });
  }

  const allocations = [
    {
      allocation: Allocation.Referral,
      accountType: AccountType.NonWithdrawable,
    },
    {
      allocation: Allocation.TPCPIReferrer,
      accountType: AccountType.NonWithdrawable,
    },
    {
      allocation: Allocation.Management,
      accountType: AccountType.NonWithdrawable,
    },
    {
      allocation: Allocation.Pooling,
      accountType: AccountType.Withdrawable,
    },
    {
      allocation: Allocation.Capital,
      accountType: AccountType.NonWithdrawable,
    },
    {
      allocation: Allocation.ITManagement,
      accountType: AccountType.Withdrawable,
    },
    {
      allocation: Allocation.PartnersManagement,
      accountType: AccountType.Withdrawable,
    },
    {
      allocation: Allocation.TPCPIReferrerManagement,
      accountType: AccountType.Withdrawable,
    },
    {
      allocation: Allocation.TPCPIManagement,
      accountType: AccountType.Withdrawable,
    },
  ];

  for (const { allocation, accountType } of allocations) {
    const accountExists = await prisma.allocationAccount.findFirst({
      where: { allocation },
    });

    if (!accountExists) {
      await prisma.allocationAccount.create({
        data: {
          allocation,
          balance: 0,
          accountType,
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
