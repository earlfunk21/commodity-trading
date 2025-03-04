import { getUser } from "@/actions/core/user.action";
import UserUpdateForm from "@/app/admin/user/[username]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  username: string;
};

export default async function UserUpdateData({ username }: Props) {
  const { data: user, error } = await getUser(username);

  if (error) {
    return <AlertError title={error} />;
  }

  return <UserUpdateForm user={user} />;
}
