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
      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
      : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700";
  };

  return (
    <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full shadow-inner">
            <UserIcon className="h-7 w-7 text-primary dark:text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {user.username}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
              <AtSignIcon className="h-3.5 w-3.5" />
              {user.email}
            </p>
          </div>
        </div>
        <Badge
          className={`${getStatusColor(
            user.status
          )} px-4 py-1.5 text-sm font-medium rounded-full text-white shadow-sm`}>
          {user.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-7 space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:translate-y-[-2px]">
            <span className="text-gray-500 dark:text-gray-400 text-sm block mb-2 font-medium">
              Sponsor
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {!!user.upline ? (
                user.upline.username
              ) : (
                <Badge
                  variant="outline"
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  No Sponsor
                </Badge>
              )}
            </span>
          </div>
          <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:translate-y-[-2px]">
            <span className="text-gray-500 dark:text-gray-400 text-sm block mb-2 font-medium">
              Role
            </span>
            <span className="font-semibold capitalize bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full text-primary dark:text-primary-foreground">
              {user.role}
            </span>
          </div>
          <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:translate-y-[-2px]">
            <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mb-2 font-medium">
              <CalendarIcon className="h-4 w-4" /> Created
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {format(user.createdAt, "PPP")}
            </span>
          </div>
          <div className="p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-transform duration-300 hover:translate-y-[-2px]">
            <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mb-2 font-medium">
              <ClockIcon className="h-4 w-4" /> Last Updated
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {format(user.updatedAt, "PPP")}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold mb-5 text-xl text-gray-800 dark:text-gray-100">
            Account Information
          </h4>
          <Suspense
            fallback={
              <div className="flex justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
