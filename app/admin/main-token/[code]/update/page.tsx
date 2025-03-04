import MainTokenUpdateData from "@/app/admin/main-token/[code]/update/_components/data";
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
    code: string;
  };
};

export default function MainTokenUpdatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MainToken Update Form</CardTitle>
        <CardDescription>Update the main token details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenUpdateData code={params.code} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
