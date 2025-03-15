import { User } from "@/types/core.type";

export type Complan = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  name: string;
  referral: number;
  tpcpiReferrer: number;
  management: number;
  pooling: number;
  capital: number;
  itManagement: number;
  partnersManagement: number;
  tpcpiReferrerManagement: number;
  tpcpiManagement: number;
};

export type Account = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  userId: string;
  user: User;
  balance: number;
};

export type AccountDeposit = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  accountId: string;
  account: Account;
  amount: number;
  status: DepositStatus;
};

export enum DepositStatus {
  Pending = "Pending",
  Approved = "Approved",
  Declined = "Declined",
}
