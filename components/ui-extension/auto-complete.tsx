"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props<T> = {
  name: string;
  value?: any;
  onChange: (value?: any) => void;
  getData: (searchValue: string) => Promise<T[]>;
  label: (value: T) => string;
  onSelectItem?: (value: T) => void;
  disabled?: boolean;
  initialData?: T[];
};

export const AutoComplete = <T,>({
  name,
  value,
  onChange,
  onSelectItem,
  getData,
  label,
  disabled,
  initialData,
}: Props<T>) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data, isLoading } = useSWR(
    open && `/auto-complete/${name}/${debouncedSearchValue}`,
    () => getData(debouncedSearchValue),
    {
      fallbackData: initialData,
      revalidateOnMount: true,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const getLabel = () => {
    if (!data || !value) {
      return "Select data";
    }
    const foundItem = data.find((item: any) => item.id === value);
    if (foundItem) {
      return label(foundItem);
    }
    return "Select data";
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between w-full overflow-hidden",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}>
            <div className="grid">
              <span className="truncate">
                {value ? getLabel() : "Select data"}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="my-4">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search here..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {data && (
                <CommandGroup>
                  {data.map((item: any) => (
                    <CommandItem
                      value={label(item)}
                      key={item.id}
                      onSelect={() => {
                        onChange(item.id);
                        if (onSelectItem) {
                          onSelectItem(item);
                        }
                        setOpen(false);
                      }}
                      className="relative">
                      {label(item)}
                      {item.id === value && (
                        <CheckIcon className="absolute right-0" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              <CommandLoading />
            </CommandList>
          </Command>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between w-full overflow-hidden",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}>
            <div className="grid">
              <span className="truncate">
                {value ? getLabel() : "Select data"}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search here..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {data && (
              <CommandGroup>
                {data.map((item: any) => (
                  <CommandItem
                    value={label(item)}
                    key={item.id}
                    onSelect={() => {
                      onChange(item.id);
                      if (onSelectItem) {
                        onSelectItem(item);
                      }
                      setOpen(false);
                    }}
                    className="relative">
                    {label(item)}
                    {item.id === value && (
                      <CheckIcon className="absolute right-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandLoading />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
