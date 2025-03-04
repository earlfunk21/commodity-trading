export type Complan = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  description: string;
  _count: {
    allocations: number;
  };
};

export type Allocation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name: string;
  percentage: number;
  complanId: string;
  complan: Complan;
};
