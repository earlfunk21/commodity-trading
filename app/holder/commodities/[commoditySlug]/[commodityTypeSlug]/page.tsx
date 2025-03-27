import HolderHeader from "@/components/holder-header";
import LoadingIcon from "@/components/loading-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";
import { Suspense } from "react";
import MainTokenListData from "./_components/data";

type Props = {
  params: {
    commoditySlug: string;
    commodityTypeSlug: string;
  };
};

export default function CommodityTypePage({ params }: Props) {
  return (
    <main>
      <HolderHeader>
        <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="../../commodities"
                className="text-zinc-400 hover:text-orange-500 transition-colors">
                Commodities
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4 text-orange-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`../${params.commoditySlug}`}
                className="font-medium text-zinc-400 hover:text-orange-500">
                {params.commoditySlug}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4 text-orange-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`${params.commodityTypeSlug}`}
                className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent ">
                {params.commodityTypeSlug}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HolderHeader>
      <div className="flex flex-col gap-4k py-4 md:py-8 md:px-4 max-w-7xl mx-auto">
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenListData commodityTypeSlug={params.commodityTypeSlug} />
        </Suspense>
      </div>
    </main>
  );
}
