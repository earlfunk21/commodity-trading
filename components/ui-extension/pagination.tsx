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
  PaginationLink,
  Pagination as PaginationPrimitive,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  total: number;
  page: number;
  defaultSize?: number;
  hideSizes?: boolean;
  hideInfinite?: boolean;
  className?: string;
};

export default function Pagination({
  total,
  page,
  hideSizes,
  hideInfinite,
  defaultSize,
  className,
}: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  // Get size from URL or use default
  const [size, setSize] = useState(() => {
    const sizeParam = searchParams.get("size");
    return sizeParam || (defaultSize ? defaultSize.toString() : "10");
  });

  const totalPages = Math.max(1, Math.ceil(total / Number(size)));
  const confirm = useConfirm();
  const isInfiniteMode = !!searchParams.get("infinite");

  // Sync size state with URL parameter when it changes
  useEffect(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam && sizeParam !== size) {
      setSize(sizeParam);
    }
  }, [searchParams, size]);

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    return newParams.toString();
  };

  const handleChangePage = (newPage: number) => {
    replace(`${pathName}?${createQueryString({ page: newPage.toString() })}`, {
      scroll: false,
    });
  };

  const onSizeChanged = (newSize: string) => {
    replace(
      `${pathName}?${createQueryString({
        size: newSize,
        infinite: null,
        page: "1", // Reset to first page when size changes
      })}`,
      { scroll: false }
    );
    setSize(newSize);
  };

  const onInfinite = async () => {
    if (isInfiniteMode) {
      replace(`${pathName}?${createQueryString({ infinite: null })}`, {
        scroll: true,
      });
    } else {
      const confirmResult = await confirm({
        title: "Show all data?",
        description:
          "Loading all data may take longer than usual. Are you sure you want to continue?",
      });

      if (!confirmResult) return;

      setSize("10");
      replace(
        `${pathName}?${createQueryString({
          infinite: "true",
          size: null,
          page: "1",
        })}`,
        { scroll: true }
      );
    }
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push(-1); // -1 represents ellipsis
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push(-2); // -2 represents second ellipsis
    }

    // Add last page if more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:gap-4 w-full",
        "transition-all duration-200 ease-in-out",
        className
      )}>
      <div className="flex flex-wrap justify-between items-center w-full gap-3">
        <PaginationPrimitive className="mx-auto sm:mx-0">
          <PaginationContent className="flex flex-wrap gap-1 sm:gap-2">
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
                disabled={page <= 1 || isInfiniteMode}
                onClick={() => handleChangePage(1)}
                title="First page">
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
                disabled={page <= 1 || isInfiniteMode}
                onClick={() => handleChangePage(page - 1)}
                title="Previous page">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {!isInfiniteMode &&
              getPageNumbers().map((pageNumber, index) => {
                // Handle ellipsis
                if (pageNumber < 0) {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-sm">
                        ...
                      </span>
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      className={cn(
                        "h-8 w-8 sm:h-9 sm:w-9 p-0 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
                        "transition-colors duration-200"
                      )}
                      isActive={pageNumber === page}
                      onClick={() => handleChangePage(pageNumber)}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
                disabled={page >= totalPages || isInfiniteMode}
                onClick={() => handleChangePage(page + 1)}
                title="Next page">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
                disabled={page >= totalPages || isInfiniteMode}
                onClick={() => handleChangePage(totalPages)}
                title="Last page">
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </PaginationPrimitive>

        <div className="flex flex-row gap-2 mx-auto sm:mx-0">
          {!hideInfinite && (
            <Button
              onClick={onInfinite}
              variant="outline"
              size="sm"
              className={cn(
                "transition-all duration-200",
                isInfiniteMode && "bg-primary/10"
              )}>
              {isInfiniteMode ? "Paginated" : "Infinite"}
              {isInfiniteMode && <Check className="ml-1 h-4 w-4" />}
            </Button>
          )}

          {!hideSizes && !isInfiniteMode && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {size} per page
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Rows per page</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={size}
                  onValueChange={onSizeChanged}>
                  <DropdownMenuRadioItem value="10">
                    10 rows
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="20">
                    20 rows
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="50">
                    50 rows
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="100">
                    100 rows
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="text-center sm:text-right text-sm text-muted-foreground">
        {isInfiniteMode ? (
          <span>Showing all {total} items</span>
        ) : (
          <span>
            Page {page} of {totalPages}
            <span className="hidden sm:inline"> • Showing </span>
            <span className="sm:hidden"> • </span>
            {Math.min(total, (page - 1) * Number(size) + 1)}-
            {Math.min(total, page * Number(size))} of {total}
          </span>
        )}
      </div>
    </div>
  );
}
