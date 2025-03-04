import ComplanCreateForm from "@/app/admin/complan/_components/create-form";
import ComplanData from "@/app/admin/complan/_components/data";
import ComplanPagination from "@/app/admin/complan/_components/pagination";
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

export default function ComplanPage({ searchParams }: Props) {
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
                <Button>Create New Complan</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Create Complan Form</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to create a new complan.
                  </DialogDescription>
                </DialogHeader>
                <ComplanCreateForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <ComplanData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <ComplanPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
