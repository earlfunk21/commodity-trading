import { getUser } from "@/actions/core/user.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { User } from "@/types/core.type";

type Props = {
  username: string;
  children: (props: { user: User }) => Promise<JSX.Element>;
};

export default async function WithUser({ children, username }: Props) {
  const { data: user, error } = await getUser(username);

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ user: user });
}
