import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { titleCase } from "@/lib/utils";
import { Admin, UserStatus } from "@/types/core.type";
import { format } from "date-fns";
import Link from "next/link";

interface AdminCardProps {
  admin: Admin;
}

export default function AdminDetailsCard({ admin }: AdminCardProps) {
  const getStatusColor = (status: UserStatus) => {
    return status === UserStatus.Active ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            {titleCase(admin.firstName, admin.lastName)}
          </h3>
          <p className="text-gray-500">{admin.user.email}</p>
        </div>
        <Badge className={getStatusColor(admin.user.status)}>
          {admin.user.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="font-semibold">User Details</h4>
            <div className="flex justify-end">
              <Button
                size="sm"
                variant="secondary"
                asChild>
                <Link href={`${admin.id}/update`}>Update User</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Username</span>
            <span className="font-medium">{admin.user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium">{admin.user.role}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Dates</h4>
          <div className="flex justify-between">
            <span className="text-gray-500">Created</span>
            <span className="font-medium">
              {format(admin.createdAt, "PPP")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Updated</span>
            <span className="font-medium">
              {format(admin.updatedAt, "PPP")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
