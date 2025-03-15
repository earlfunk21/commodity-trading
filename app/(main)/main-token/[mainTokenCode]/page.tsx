import MainTokenData from "@/app/(main)/main-token/[mainTokenCode]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Suspense } from "react";

type Props = {
  params: {
    mainTokenCode: string;
  };
};

export default function MainTokenPage({ params }: Props) {
  return (
    <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-4 pb-16">
      <div className="container mx-auto max-w-7xl">
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenData mainTokenCode={params.mainTokenCode} />
        </Suspense>
      </div>
    </main>
  );
}
