import ComplanUpdateData from "@/app/admin/complan/[complanId]/update/_components/data";
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
    complanId: string;
  };
};

export default function ComplanUpdatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complan Update Form</CardTitle>
        <CardDescription>Update the complan details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <ComplanUpdateData id={params.complanId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
