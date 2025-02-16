import { getUserList } from "@/actions/core/user.action";
import UserTable from "@/app/(main)/user/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function UserListData({ searchParams }: Props) {
  const { data: userList, error } = await getUserList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (userList.length === 0) {
    return <AlertInfo title="No users found" />;
  }

  return <UserTable userList={userList} />;
}
