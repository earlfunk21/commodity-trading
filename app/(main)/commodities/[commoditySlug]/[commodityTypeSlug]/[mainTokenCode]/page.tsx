import MainTokenData from "@/app/(main)/commodities/[commoditySlug]/[commodityTypeSlug]/[mainTokenCode]/_components/data";
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
import MainTokenValueChart from "./_components/main-token-value-chart";

type Props = {
  params: {
    commoditySlug: string;
    commodityTypeSlug: string;
    mainTokenCode: string;
  };
};

export default function MainTokenPage({ params }: Props) {
  return (
    <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-4 pb-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex pb-8">
          <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/commodities"
                  className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Commodities
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronsRight className="h-4 w-4 text-orange-500" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/commodities/${params.commoditySlug}`}
                  className="font-medium text-zinc-400 hover:text-orange-500">
                  {params.commoditySlug}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronsRight className="h-4 w-4 text-orange-500" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/commodities/${params.commoditySlug}/${params.commodityTypeSlug}`}
                  className="font-medium text-zinc-400 hover:text-orange-500">
                  {params.commodityTypeSlug}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronsRight className="h-4 w-4 text-orange-500" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/commodities/${params.commoditySlug}/${params.commodityTypeSlug}/${params.mainTokenCode}`}
                  className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent ">
                  {params.mainTokenCode}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenData
                commodityTypeSlug={params.commodityTypeSlug}
                commoditySlug={params.commoditySlug}
                mainTokenCode={params.mainTokenCode}
              />
            </Suspense>
          </div>
          <div className="col-span-7">
            <MainTokenValueChart />
          </div>
        </div>
      </div>
    </main>
  );
}
