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
  totalValue: number;
  unitValue: number;
  quantity: number;
  totalTokens: number;
  origin: string;
  performanceBondNumber: string;
  insurerCompany: string;
  certificateOfStockNumber: string;
  CADTNumber: string;
  tradingStart: Date;
  tradingEnd: Date;
  _count: {
    subTokens: number;
  };
  last: number;
  change: number;
  volume: number;
  unitType: string;
  complanId: string;
  complan: Complan;
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
  mainTokenId: string;
  mainToken: MainToken
};

export type SubToken = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  amount: number;
  tokens: number;
  mainTokenId: string;
  mainToken: MainToken;
  status: SubTokenStatus;
  parentTokenId?: string | null;
  holderId: string;
  holder: Holder;
  parentToken?: SubToken | null;
  childTokens: SubToken[];
  purchaseTokens: PurchaseToken[];
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
  status: PurchaseStatus;
  holderId: string;
  holder: Holder;
  approvedByAdminId?: string | null;
  approvedByAdmin?: Admin | null;
  subTokenId?: string | null;
  subToken?: SubToken | null;
};

export enum PurchaseStatus {
  Pending = "Pending",
  Approved = "Approved",
  Declined = "Declined",
}
