import CommodityTypeCreateForm from "@/app/admin/commodity-type/_components/create-form";
import CommodityTypeData from "@/app/admin/commodity-type/_components/data";
import CommodityTypePagination from "@/app/admin/commodity-type/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense } from "react";

type Props = {
  searchParams: any;
};

export default function CommodityTypePage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Commodity Types</CardTitle>
            <CardDescription>list of commodity types</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Commodity Type</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Create Commodity Type Form</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to create a new commodity type.
                  </DialogDescription>
                </DialogHeader>
                <CommodityTypeCreateForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityTypeData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityTypePagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
