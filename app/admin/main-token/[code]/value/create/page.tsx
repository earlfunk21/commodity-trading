import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import MainTokenValueCreateData from "./_components/data";

type Props = {
  params: {
    code: string;
  };
};

export default function MainTokenCreatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Main Token Value</CardTitle>
        <CardDescription>add new value for the main token.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenValueCreateData code={params.code} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
