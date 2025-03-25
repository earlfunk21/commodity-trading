import SubTokenData from "@/app/holder/sub-token/_components/data";
import SubTokenPagination from "@/app/holder/sub-token/_components/pagination";
import HolderHeader from "@/components/holder-header";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";
import { Suspense } from "react";

type Props = {
  searchParams: any;
};

export default function SubTokenPage({ searchParams }: Props) {
  return (
    <main>
      <HolderHeader>
        <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="text-zinc-400 hover:text-orange-500 transition-colors">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4 text-orange-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/holder/purchase-token`}
                className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Purchase Token
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HolderHeader>
      <div className="flex flex-col gap-4k py-4 md:py-8 md:px-4">
        <SearchInput />
        <Suspense fallback={<LoadingIcon />}>
          <SubTokenData searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<LoadingIcon />}>
          <SubTokenPagination searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
