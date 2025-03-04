import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import { getCommodityList } from "@/actions/pooling/commodity.action";
import CommodityTypeCard from "@/app/(main)/commodities/_components/commodity-type-card";
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

export default async function CommodityListData() {
  const { data } = await getCommodityList({
    size: 3,
  });

  const commodityList = await Promise.all(
    data.map(async (commodity) => {
      const { data: types } = await getCommodityTypeList({
        size: 3,
        commodityId: commodity.id,
      });

      return {
        ...commodity,
        types,
      };
    })
  );

  return (
    <div className="flex flex-col">
      {commodityList.map((commodity) => (
        <Card
          key={commodity.id}
          className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl grid grid-cols-12">
          <CardHeader className="col-span-4">
            <Link href={`/commodities/${commodity.slug}`}>
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
            {commodity.types.map((commodityType) => (
              <CommodityTypeCard
                key={commodityType.id}
                commodityType={commodityType}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
