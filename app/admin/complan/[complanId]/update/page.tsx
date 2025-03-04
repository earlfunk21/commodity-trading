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
    id: string;
  };
};

export default function ComplanUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Complan Update Form</CardTitle>
        <CardDescription>Update the complan details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <ComplanUpdateData id={params.id} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
