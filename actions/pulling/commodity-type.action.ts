"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { CommodityType } from "@/types/pulling.type";
import { revalidateTag } from "next/cache";

export async function createCommodityType(values: any) {
  return apiRequest<CommodityType>("/commodity-type/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("commodity-type");
    },
  });
}

export async function getCommodityTypeList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<CommodityType[]>(`/commodity-type/list?${params}`, {
    next: {
      tags: ["commodity-type"],
    },
    cache: "no-store",
  });
}

export async function getCommodityTypeCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/commodity-type/count?${params}`, {
    next: {
      tags: ["commodity-type"],
    },
    cache: "no-store",
  });
}

export async function getCommodityType(slug: string) {
  return apiRequest<CommodityType>(`/commodity-type/get/${slug}`, {
    next: {
      tags: [slug],
      revalidate: 300,
    },
  });
}

export async function updateCommodityType(id: string, values: any) {
  return apiRequest<CommodityType>(`/commodity-type/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: ({ data, error }) => {
      revalidateTag("commodity-type");
      if (!error) {
        revalidateTag(data.slug);
      }
    },
  });
}

export async function removeCommodityType(slug: string) {
  return apiRequest<CommodityType>(`/commodity-type/remove/${slug}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("commodity-type");
    },
  });
}

export async function uploadCommodityTypeImages(
  slug: string,
  formData: FormData
) {
  return apiRequest<CommodityType>(`/commodity-type/upload-images/${slug}`, {
    method: "PUT",
    body: formData,
    afterRequest: () => {
      revalidateTag("commodity-type");
      revalidateTag(slug);
    },
  });
}

export async function removeCommodityTypeImage(slug: string, key: string) {
  console.log(slug)
  return apiRequest<CommodityType>(
    `/commodity-type/remove-image/${slug}/${encodeURI(key)}`,
    {
      method: "DELETE",
      afterRequest: () => {
        revalidateTag("commodity-type");
        revalidateTag(slug);
      },
    }
  );
}

export async function uploadCommodityTypeVideos(
  slug: string,
  formData: FormData
) {
  return apiRequest<CommodityType>(`/commodity-type/upload-videos/${slug}`, {
    method: "PUT",
    body: formData,
    afterRequest: () => {
      revalidateTag("commodity-type");
      revalidateTag(slug);
    },
  });
}

export async function removeCommodityTypeVideo(slug: string, key: string) {
  return apiRequest<CommodityType>(
    `/commodity-type/remove-video/${slug}/${key}`,
    {
      method: "DELETE",
      afterRequest: () => {
        revalidateTag("commodity-type");
        revalidateTag(slug);
      },
    }
  );
}

export async function uploadCommodityTypeDocuments(
  slug: string,
  formData: FormData
) {
  return apiRequest<CommodityType>(`/commodity-type/upload-documents/${slug}`, {
    method: "PUT",
    body: formData,
    afterRequest: () => {
      revalidateTag("commodity-type");
      revalidateTag(slug);
    },
  });
}

export async function removeCommodityTypeDocument(slug: string, key: string) {
  return apiRequest<CommodityType>(
    `/commodity-type/remove-document/${slug}/${key}`,
    {
      method: "DELETE",
      afterRequest: () => {
        revalidateTag("commodity-type");
        revalidateTag(slug);
      },
    }
  );
}
