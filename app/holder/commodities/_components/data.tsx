import { getCommodityList } from "@/actions/pooling/commodity.action";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import CommodityTypesData from "./commodity-types-data";

export default async function CommodityListData() {
  const { data: commodityList } = await getCommodityList({
    size: 3,
  });

  return (
    <div className="flex flex-col gap-4">
      {commodityList.map((commodity) => (
        <Card
          key={commodity.id}
          className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl grid grid-cols-12">
          <CardHeader className="col-span-4">
            <Link href={`commodities/${commodity.slug}`}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight hover:from-orange-500 hover:via-red-500 hover:to-orange-500 cursor-pointer">
                {commodity.name}
              </CardTitle>
            </Link>
            <CardDescription className="text-zinc-400 text-lg font-light tracking-wide">
              {commodity.description}
            </CardDescription>
            <div className="flex items-end h-full">
              <Button variant="outline" className="border-orange-500">
                {commodity.name} Updates
                <ChevronRight className="text-orange-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 col-span-8 grid-rows-2">
            <Suspense fallback={<LoadingIcon />}>
              <CommodityTypesData key={commodity.id} commodity={commodity} />
            </Suspense>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
