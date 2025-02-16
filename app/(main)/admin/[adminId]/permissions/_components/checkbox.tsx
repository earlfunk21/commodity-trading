"use client";
import {
  createAdminPermission,
  removeAdminPermission,
} from "@/actions/core/admin-permission.action";
import { Checkbox } from "@/components/ui/checkbox";
import { AdminPermission } from "@/types/core.type";
import { startTransition, useOptimistic } from "react";

type Props = {
  adminId: string;
  permission: string;
  adminPermissions: AdminPermission[];
};

export default function AdminPermissionCheckbox({
  adminId,
  permission,
  adminPermissions,
}: Props) {
  const [optimisticChecked, updateOptimisticChecked] = useOptimistic(
    adminPermissions.some((ap) => ap.permission === permission),
    (_: boolean, optimisticValue: boolean) => {
      return optimisticValue;
    }
  );

  const updateAdminPermission = async (checked: boolean) => {
    if (checked) {
      startTransition(async () => {
        updateOptimisticChecked(checked);
        const result = await createAdminPermission({ adminId, permission });

        if (result.error) {
          updateOptimisticChecked(!checked);
        }
      });
    } else {
      startTransition(async () => {
        const adminPermission = adminPermissions.find(
          (adminPermission) => adminPermission.permission === permission
        );
        if (!adminPermission) return;
        updateOptimisticChecked(checked);
        const result = await removeAdminPermission(adminPermission.id);

        if (result.error) {
          updateOptimisticChecked(!checked);
        }
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="permissions"
        checked={optimisticChecked}
        onCheckedChange={updateAdminPermission}
      />
      <label
        htmlFor="permissions"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {permission}
      </label>
    </div>
  );
}
