import { User } from "@/types/core.type";
import { MainTokenTransaction, TradeTransaction } from "@/types/pooling.type";

export type Complan = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  commission: number;
  tax: number;
  totalFeePercentage: number;
  itManagement: number;
  partnersManagement: number;
  tpcpiReferrerManagement: number;
  tpcpiManagement: number;
  capital: number;
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

export type AllocationAccount = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  allocation: Allocation;
  balance: number;
  transactions: AllocationAccountTransaction[];
};

export enum Allocation {
  ITManagement = "ITManagement",
  PartnersManagement = "PartnersManagement",
  TPCPIReferrerManagement = "TPCPIReferrerManagement",
  TPCPIManagement = "TPCPIManagement",
}

export type AllocationAccountTransaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  allocation: Allocation;
  amount: number;
  mainTokenTransactionId?: string;
  mainTokenTransaction?: MainTokenTransaction;
  accountId: string;
  account: AllocationAccount;
  tradeTransaction?: TradeTransaction;
  tradeTransactionId?: string;
};
