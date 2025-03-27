import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import MainTokenListData from "./main-token-data";

type Props = {
  commoditySlug: string;
};

export default async function CommodityTypeListData({ commoditySlug }: Props) {
  const { data: commodityTypeList } = await getCommodityTypeList({
    commoditySlug,
  });

  return (
    <div className="flex flex-col gap-6">
      {commodityTypeList.map((commodityType) => (
        <Card
          key={commodityType.id}
          className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl grid grid-cols-12">
          <CardHeader className="col-span-4">
            <Link href={`${commoditySlug}/${commodityType.slug}`}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight hover:from-orange-500 hover:via-red-500 hover:to-orange-500 cursor-pointer">
                {commodityType.name}
              </CardTitle>
            </Link>
            <CardDescription className="text-zinc-400 text-lg font-light tracking-wide">
              {commodityType.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 col-span-8 grid-rows-2">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenListData commodityType={commodityType} />
            </Suspense>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
