import CommodityCreateForm from "@/app/(main)/commodity/_components/create-form";
import CommodityData from "@/app/(main)/commodity/_components/data";
import CommodityPagination from "@/app/(main)/commodity/_components/pagination";
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

export default function CommodityPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Commodities</CardTitle>
            <CardDescription>list of commodities</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Commodity</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Create Commodity Form</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to create a new commodity.
                  </DialogDescription>
                </DialogHeader>
                <CommodityCreateForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
