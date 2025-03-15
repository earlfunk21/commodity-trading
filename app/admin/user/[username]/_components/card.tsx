import AccountCard from "@/app/admin/user/[username]/_components/account-card";
import LoadingIcon from "@/components/loading-icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, UserStatus } from "@/types/core.type";
import { format } from "date-fns";
import { AtSignIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { Suspense } from "react";

interface UserCardProps {
  user: User;
}

export default function UserDetailsCard({ user }: UserCardProps) {
  const getStatusColor = (status: UserStatus) => {
    return status === UserStatus.Active
      ? "bg-green-500 hover:bg-green-600"
      : "bg-red-500 hover:bg-red-600";
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{user.username}</h3>
            <p className="text-gray-500 flex items-center gap-1">
              <AtSignIcon className="h-3 w-3" />
              {user.email}
            </p>
          </div>
        </div>
        <Badge
          className={`${getStatusColor(
            user.status
          )} px-3 py-1 text-sm font-medium rounded-md`}>
          {user.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <span className="text-gray-500 text-sm block mb-1">Sponsor</span>
            <span className="font-medium">
              {!!user.upline ? (
                user.upline.username
              ) : (
                <Badge variant="outline">No Sponsor</Badge>
              )}
            </span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <span className="text-gray-500 text-sm block mb-1">Role</span>
            <span className="font-medium capitalize bg-primary/10 px-2 py-0.5 rounded text-primary">
              {user.role}
            </span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex flex-col">
            <span className="text-gray-500 text-sm flex items-center gap-1 mb-1">
              <CalendarIcon className="h-3 w-3" /> Created
            </span>
            <span className="font-medium">{format(user.createdAt, "PPP")}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex flex-col">
            <span className="text-gray-500 text-sm flex items-center gap-1 mb-1">
              <ClockIcon className="h-3 w-3" /> Last Updated
            </span>
            <span className="font-medium">{format(user.updatedAt, "PPP")}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium mb-3 text-lg">Account Information</h4>
          <Suspense
            fallback={
              <div className="flex justify-center p-4">
                <LoadingIcon />
              </div>
            }>
            <AccountCard userId={user.id} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
