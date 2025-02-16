import UserDropdownAction from "@/app/(main)/user/_components/dropdown-action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UserRole, UserStatus } from "@/types/core.type";

type Props = {
  userList: User[];
};

export default function UserTable({ userList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="md:font-semibold">Username</TableHead>
            <TableHead className="md:font-semibold">Email</TableHead>
            <TableHead className="md:font-semibold">Roles</TableHead>
            <TableHead className="md:font-semibold">Status</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow
              key={user.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Username
                </span>
                <span className="font-medium">{user.username}</span>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Email
                </span>
                {user.email}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Role
                </span>
                {user.role === UserRole.Owner ? (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20">
                    Owner
                  </Badge>
                ) : user.role === UserRole.Admin ? (
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20">
                    Admin
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-500/20">
                    Holder
                  </Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Status
                </span>
                {user.status === UserStatus.Active ? (
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />
                    Inactive
                  </Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <UserDropdownAction user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
