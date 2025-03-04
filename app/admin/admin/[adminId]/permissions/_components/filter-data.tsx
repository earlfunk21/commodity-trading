"use client";
import AdminPermissionCheckbox from "@/app/admin/admin/[adminId]/permissions/_components/checkbox";
import { Input } from "@/components/ui/input";
import { AdminPermission, ResourcePermission } from "@/types/core.type";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  adminId: string;
  adminPermissions: AdminPermission[];
  permissions: ResourcePermission[];
};

export default function FilterPermissionsData({
  adminId,
  adminPermissions,
  permissions,
}: Props) {
  const [filteredPermissions, setFilteredPermissions] = useState(permissions);

  return (
    <div className="space-y-6">
      <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
        <SearchIcon className="h-5 w-5 text-primary" />
        <Input
          placeholder="Search something..."
          className="border-0 focus-visible:ring-0 shadow-none"
          onChange={(e) => {
            setFilteredPermissions(
              permissions
                .map((resource) => ({
                  ...resource,
                  permissions: resource.permissions.filter((permission) =>
                    permission.includes(e.target.value)
                  ),
                }))
                .filter((resource) => resource.permissions.length > 0)
            );
          }}
        />
      </div>
      {filteredPermissions.map((resource, i) => (
        <div key={i} className="space-y-2">
          <h3 className="text-lg font-semibold">{resource.resource}</h3>
          <div className="grid grid-cols-2 gap-2">
            {resource.permissions.map((permission, k) => (
              <AdminPermissionCheckbox
                key={k}
                adminId={adminId}
                permission={permission}
                adminPermissions={adminPermissions}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
