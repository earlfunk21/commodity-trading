import { User } from "@/types/core.type";

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
  remarks: string;
  type: AccountTransactionType;
  accountId: string;
  account: AllocationAccount;
};

export interface ComplanFeeBracket {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  purchases: number;
  referralFeePercentage: number;
  managementFeePercentage: number;
  initialReferralFeePercentage: number;
  initialManagementFeePercentage: number;
  releaseReferralFeePercentage: number;
  releaseManagementFeePercentage: number;
  complanId: string;
  complan: Complan;
}

export type AccountTransaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  account: Account;
  accountId: string;
  amount: number;
  type: AccountTransactionType;
  accountDepositId?: string;
  accountDeposit?: AccountDeposit;
  remarks: string;
};

export enum AccountTransactionType {
  Pooling = "Pooling",
  Income = "Income",
  Trade = "Trade",
  Purchase = "Purchase",
  Referral = "Referral",
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Transfer = "Transfer",
  Refund = "Refund",
}
