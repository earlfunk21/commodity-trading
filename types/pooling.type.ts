import { Complan } from "@/types/accounting.type";
import { Admin, User } from "@/types/core.type";

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

export type CommodityType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  description: string;
  slug: string;
  commodityId: string;
  commodity: Commodity;
  images: string[];
  videos: string[];
  documents: string[];
  _count: {
    mainTokens: number;
  };
  last: number;
  change: number;
  volume: number;
  mainTokens: MainToken[];
};

export type Commodity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  image?: string;
  name: string;
  description: string;
  slug: string;
  subtypeId: string;
  _count: {
    types: number;
    mainTokens: number;
  };
  types: CommodityType[];
};

export type MainToken = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  code: string;
  commodityId: string;
  commodity: Commodity;
  commodityTypeId: string;
  commodityType: CommodityType;
  origin: string;
  performanceBondNumber: string;
  insurerCompany: string;
  insurancePolicyNumber: string;
  certificateOfStockNumber: string;
  CADTNumber: string;
  subTokens: SubToken[];
  tradingStart: Date;
  tradingEnd: Date;
  poolingStart: Date;
  poolingEnd: Date;
  tradingDuration: Date;
  _count: {
    subTokens: number;
    pendingManagementFees: true;
    referralCommissions: true;
  };
  last: number;
  change: number;
  volume: number;
  specs: string;
  complanId: string;
  complan: Complan;
  purchaseTokens: PurchaseToken[];
  trades: Trade[];
  transactions: MainTokenTransaction[];
  tradeTransactions: TradeTransaction[];
  tokenValues: MainTokenValue[];
  currentTokenValueId?: string;
  currentTokenValue?: MainTokenValue;
  lastTokenValueId?: string;
  lastTokenValue?: MainTokenValue;
  totalFundsNeeded: number;
  totalAccumulatedFunds: number;
  status: MainTokenStatus;
};

export enum MainTokenStatus {
  Pooling = "Pooling",
  Trading = "Trading",
  Closed = "Closed",
  Terminated = "Terminated",
  Extended = "Extended",
}

export type MainTokenValue = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  commodityId: string;
  commodity: Commodity;
  commodityTypeId: string;
  commodityType: CommodityType;
  mainToken: MainToken;
  mainTokenId: string;
  totalValue: number;
  unitValue: number;
  volume: number;
  soldTokens: number;
};

export type MainTokenTransaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  complanId: string;
  complan: Complan;
  userId: string;
  user: User;
  amount: number;
  capital: number;
  initialReferralFee: number;
  releaseReferralFee: number;
  initialManagementFee: number;
  releaseManagementFee: number;
  mainTokenId: string;
  mainToken: MainToken;
  releaseReferral?: ReleaseReferral;
  releaseManagement?: ReleaseManagement;
};

export type ReleaseManagement = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  amount: number;
  itManagementAmount: number;
  partnersManagementAmount: number;
  tpcpiReferrerManagementAmount: number;
  tpcpiManagementAmount: number;
  mainTokenTransactionId: string;
  mainTokenTransaction: MainTokenTransaction;
  releasedAt?: Date | null;
};

export type ReleaseReferral = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  amount: number;
  mainTokenTransactionId: string;
  mainTokenTransaction: MainTokenTransaction;
  releasedAt?: Date | null;
  userId: string;
  user: User;
};

export type Trade = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  commodityId: string;
  commodity: Commodity;
  commodityTypeId: string;
  commodityType: CommodityType;
  mainTokenId: string;
  mainToken: MainToken;
  mainTokenValueId: string;
  mainTokenValue: MainTokenValue;
  capital: number;
  soldAmount: number;
  quantity: number;
  grossSales: number;
  transactionId?: string | null;
  transaction?: TradeTransaction | null;
  processedAt?: Date | null;
};

export type TradeTransaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  complanId: string;
  complan: Complan;
  mainToken: MainToken;
  mainTokenId: string;
  managementFee: number;
  totalGrossSales: number;
  totalUnitQuantity: number;
  capital: number;
  grossIncome: number;
  tax: number;
  netIncome: number;
  tokenValue: number;
}

export type SubToken = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  amount: number;
  tokens: number;
  commodityId: string;
  commodity: Commodity;
  commodityTypeId: string;
  commodityType: CommodityType;
  mainTokenId: string;
  mainToken: MainToken;
  mainTokenValue: MainTokenValue;
  mainTokenValueId: string;
  status: SubTokenStatus;
  holderId: string;
  holder: Holder;
  parentTokenId?: string | null;
  parent?: SubToken | null;
  _count: {
    children: number;
  };
};

export enum SubTokenStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type PurchaseToken = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  commodityId: string;
  commodity: Commodity;
  commodityTypeId: string;
  commodityType: CommodityType;
  mainTokenId: string;
  mainToken: MainToken;
  amount: number;
  capital: number;
  tokens: number;
  holderId: string;
  holder: Holder;
  approvedByAdminId?: string | null;
  approvedByAdmin?: Admin | null;
  subTokenId?: string | null;
  subToken?: SubToken | null;
};

export type Blog = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  commodityId: string;
  commodity: Commodity;
  title: string;
  content: string;
  images: string[];
  youtubeUrl?: string;
  slug: string;
  show: boolean;
};

export type NewsEvent = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  title: string;
  content: string;
  slug: string;
  show: boolean;
  images: string[];
  youtubeUrl?: string;
}