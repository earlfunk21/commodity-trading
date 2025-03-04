import CommodityListData from "@/app/(main)/commodities/_components/data";
import LoadingIcon from "@/components/loading-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";

export default function CommoditiesPage() {
  return (
    <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-4 pb-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex pb-8">
          <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Commodities
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityListData />
        </Suspense>
      </div>
    </main>
  );
}
