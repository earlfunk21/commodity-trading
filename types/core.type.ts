export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
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