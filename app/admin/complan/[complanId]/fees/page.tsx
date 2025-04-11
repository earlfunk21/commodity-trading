import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense } from "react";
import WithComplan from "../../_components/with-commodity";
import ComplanFeeBracketCreateForm from "./_components/create-form";
import ComplanFeeBracketListData from "./_components/data";

type Props = {
  searchParams: any;
  params: {
    complanId: string;
  };
};

export default function ComplanFeeBracketPage({ searchParams, params }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>ComplanFeeBrackets</CardTitle>
            <CardDescription>list of complanFeeBrackets</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Fee</Button>
              </DialogTrigger>
              <DialogContent>
                <Suspense fallback={<LoadingIcon />}>
                  <WithComplan id={params.complanId}>
                    {async ({ complan }) => (
                      <ComplanFeeBracketCreateForm complan={complan} />
                    )}
                  </WithComplan>
                </Suspense>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <ComplanFeeBracketListData
            searchParams={{
              ...searchParams,
              complanId: params.complanId,
            }}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
