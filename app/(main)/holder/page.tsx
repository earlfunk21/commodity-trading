import HolderCreateForm from "@/app/(main)/holder/_components/create-form";
import HolderData from "@/app/(main)/holder/_components/data";
import HolderPagination from "@/app/(main)/holder/_components/pagination";
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

export default function HolderPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Holders</CardTitle>
            <CardDescription>list of holders</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Holder</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Create Holder Form</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to create a new holder.
                  </DialogDescription>
                </DialogHeader>
                <HolderCreateForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <HolderData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <HolderPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
