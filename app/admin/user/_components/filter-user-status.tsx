"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/types/core.type";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: {
    status?: UserStatus;
  };
};

export default function FilterUserStatus({ searchParams }: Props) {
  const { status } = searchParams;

  const router = useRouter();

  return (
    <Select
      defaultValue={status}
      onValueChange={(newStatus) => {
        if (newStatus === "All") {
          const params = new URLSearchParams();
          params.delete("status");
          router.push(`?${params}`);
          return;
        }
        router.push(`?status=${newStatus}`);
      }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Statuses" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All User Status</SelectItem>
        <SelectItem value="Inactive">Inactive</SelectItem>
        <SelectItem value="Active">Active</SelectItem>
      </SelectContent>
    </Select>
  );
}
