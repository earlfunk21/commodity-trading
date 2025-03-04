import UploadImageForm from "@/app/admin/commodity/[slug]/_components/upload-image-form";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default function CommodityDetailsLayout({ params, children }: Props) {
  return (
    <div className="flex gap-4 md:gap-8">
      {children}
      <div className="w-full max-w-md">
        <UploadImageForm slug={params.slug} />
      </div>
    </div>
  );
}
