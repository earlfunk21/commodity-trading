import { User } from "@/types/core.type";

export type Holder = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  firstName: string;
  middleName?: string;
  lastName: string;
  userId: string;
  user: User;
};
