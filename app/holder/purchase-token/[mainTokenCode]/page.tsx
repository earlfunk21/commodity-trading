import { getComplan } from "@/actions/accounting/complan.action";
import { getMainToken } from "@/actions/pooling/main-token.action";
import PurchaseTokenForm from "@/app/holder/purchase-token/[mainTokenCode]/_components/form";
import MainTokenCard from "@/app/holder/purchase-token/[mainTokenCode]/_components/main-token-card";
import HolderHeader from "@/components/holder-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronsRight } from "lucide-react";

type Props = {
  params: {
    mainTokenCode: string;
  };
};

export default async function PurchaseMainTokenPage({ params }: Props) {
  const { data: mainToken } = await getMainToken(params.mainTokenCode);
  const { data: complan } = await getComplan(mainToken.complanId);

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
                href={`/holder/purchase-token/${params.mainTokenCode}`}
                className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Purchase Token
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HolderHeader>
      <div className="flex justify-center gap-4 py-4 md:py-8 md:px-4">
        <MainTokenCard mainToken={mainToken} />
        <Card className="max-w-xl w-full">
          <CardHeader>
            <CardTitle>Purchase Form</CardTitle>
          </CardHeader>
          <CardContent>
            <PurchaseTokenForm mainToken={mainToken} complan={complan} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
