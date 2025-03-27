import HolderHeader from "@/components/holder-header";
import LoadingIcon from "@/components/loading-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";
import CommodityListData from "./_components/data";

export default function CommoditiesPage() {
  return (
    <main>
      <HolderHeader>
        <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Commodities
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HolderHeader>
      <div className="flex flex-col gap-4k py-4 md:py-8 md:px-4 max-w-7xl mx-auto">
        <Suspense fallback={<LoadingIcon />}>
          <CommodityListData />
        </Suspense>
      </div>
    </main>
  );
}
