import { getComplan } from "@/actions/accounting/complan.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { Complan } from "@/types/accounting.type";
import React from "react";

type Props = {
  id: string;
  children: (props: { complan: Complan }) => Promise<JSX.Element>;
};

export default async function WithComplan({
  id,
  children,
}: Props) {
  const { data: complan, error } = await getComplan(id);

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ complan: complan });
}
