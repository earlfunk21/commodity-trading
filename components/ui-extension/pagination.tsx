"use client";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PaginationContent,
  PaginationItem,
  Pagination as PaginationPrimitive,
} from "@/components/ui/pagination";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  total: number;
  page: number;
  defaultSize?: number;
  hideSizes?: boolean;
};

export default function Pagination({
  total,
  page,
  hideSizes,
  defaultSize,
}: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const [size, setSize] = useState(defaultSize ? defaultSize.toString() : "10");
  const totalPages = Math.ceil(total / Number(size));
  const confirm = useConfirm();

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    replace(`${pathName}?${params}`, { scroll: false });
  };

  const onSizeChanged = (newSize: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", newSize);
    params.delete("infinite");
    replace(`${pathName}?${params}`, { scroll: false });
    setSize(newSize);
  };

  const onInfinite = async () => {
    const params = new URLSearchParams(searchParams);
    if (params.has("infinite")) {
      params.delete("infinite");
      replace(`${pathName}?${params}`, { scroll: true });
    } else {
      const confirmResult = await confirm({
        title: "This will show all data. You want to proceed?",
        description: "This will takes time to load all data.",
      });
      if (!confirmResult) return;
      setSize("10");
      params.delete("size");
      params.set("infinite", "true");
      replace(`${pathName}?${params}`, { scroll: true });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 p-4 justify-center w-full">
      <Button onClick={onInfinite} variant="outline">
        Infinite {!!searchParams.get("infinite") && <Check />}
      </Button>
      {!hideSizes && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{size}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Row Size</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={size} onValueChange={onSizeChanged}>
              <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className="flex justify-between">
        <PaginationPrimitive>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                className="gap-1 pl-2.5"
                disabled={page <= 1}
                onClick={() => handleChangePage(page - 1)}>
                <ChevronLeft />
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages} items
              </span>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                className="gap-1 pr-2.5"
                disabled={page >= totalPages}
                onClick={() => handleChangePage(page + 1)}>
                Next
                <ChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </PaginationPrimitive>
      </div>
    </div>
  );
}
