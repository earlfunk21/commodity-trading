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
};
