import HolderUpdateData from "@/app/admin/holder/[holderId]/update/_components/data";
import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

type Props = {
  params: {
    holderId: string;
  };
};

export default function HolderUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Holder Update Form</CardTitle>
        <CardDescription>Update the holder details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <HolderUpdateData holderId={params.holderId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
