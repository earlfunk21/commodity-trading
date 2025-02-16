"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
      <SearchIcon className="h-5 w-5 text-primary" />
      <Input
        placeholder="Search something..."
        className="border-0 focus-visible:ring-0 shadow-none"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={search ?? ""}
      />
    </div>
  );
}
