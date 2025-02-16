import { getUser } from "@/actions/core/user.action";
import UserCard from "@/app/(main)/user/[username]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  username: string;
};

export default async function UserDetailsData({ username }: Props) {
  const { data: user, error } = await getUser(username);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!user) {
    throw new Error("User not found");
  }

  return <UserCard user={user} />;
}
