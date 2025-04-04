import { getCommodity } from "@/actions/pooling/commodity.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { Commodity } from "@/types/pooling.type";
import React from "react";

type Props = {
  commoditySlug: string;
  children: (props: { commodity: Commodity }) => Promise<JSX.Element>;
};

export default async function WithCommodity({
  commoditySlug,
  children,
}: Props) {
  const { data: commodity, error } = await getCommodity(commoditySlug);

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ commodity: commodity });
}
