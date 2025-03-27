import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { titleCase } from "@/lib/utils";
import { UserStatus } from "@/types/core.type";
import { Holder } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

interface HolderCardProps {
  holder: Holder;
}

export default function HolderDetailsCard({ holder }: HolderCardProps) {
  const getStatusColor = (status: UserStatus) => {
    return status === UserStatus.Active ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            {titleCase(holder.firstName, holder.lastName)}
          </h3>
          <p className="text-gray-500">{holder.user.email}</p>
        </div>
        <Badge className={getStatusColor(holder.user.status)}>
          {holder.user.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h4 className="font-semibold">User Details</h4>
            <div className="flex justify-end">
              <Button size="sm" variant="secondary" asChild>
                <Link href={`${holder.id}/update`}>Update User</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Username</span>
            <span className="font-medium">{holder.user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium">{holder.user.role}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Dates</h4>
          <div className="flex justify-between">
            <span className="text-gray-500">Created</span>
            <span className="font-medium">
              {format(holder.createdAt, "PPP")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Updated</span>
            <span className="font-medium">
              {format(holder.updatedAt, "PPP")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
