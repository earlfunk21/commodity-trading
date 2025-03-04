import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, UserStatus } from "@/types/core.type";
import { format } from "date-fns";

interface UserCardProps {
  user: User;
}

export default function UserDetailsCard({ user }: UserCardProps) {
  const getStatusColor = (status: UserStatus) => {
    return status === UserStatus.Active ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{user.username}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Sponsor</span>
          <span className="font-medium">
            {!!user.upline ? (
              user.upline.username
            ) : (
              <Badge variant="outline">No Sponsor</Badge>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Role</span>
          <span className="font-medium">{user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Created</span>
          <span className="font-medium">{format(user.createdAt, "PPP")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Last Updated</span>
          <span className="font-medium">{format(user.updatedAt, "PPP")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
