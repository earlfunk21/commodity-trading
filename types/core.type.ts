import { Account } from "@/types/accounting.type";

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
  uplineId?: string;
  upline?: User;
  downlines: User[];
  _count: {
    downlines: number;
  };
  accountId?: string;
  account?: Account;
};

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum UserRole {
  Holder = "Holder",
  Admin = "Admin",
  Owner = "Owner",
}

export type Admin = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  firstName: string;
  middleName?: string;
  lastName: string;
  userId: string;
  user: User;
  permissions: AdminPermission[];
};

export type AdminPermission = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  adminId: string;
  admin: Admin;
  permission: string;
};

export type ResourcePermission = {
  resource: string;
  permissions: string[];
};

export enum FileType {
  Image = "Image",
  Video = "Video",
  Document = "Document",
}

export type File = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  url: string;
  path: string;
  name: string;
  type: FileType;
  uploadedByUserId: string;
  uploadedByUser: User;
};
