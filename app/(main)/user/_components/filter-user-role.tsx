"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/core.type";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: {
    role?: UserRole;
  };
};

export default function FilterUserRole({ searchParams }: Props) {
  const { role } = searchParams;

  const router = useRouter();

  return (
    <Select
      defaultValue={role}
      onValueChange={(newRole) => {
        if (newRole === "All") {
          const params = new URLSearchParams();
          params.delete("role");
          router.push(`?${params}`);
          return;
        }
        router.push(`?role=${newRole}`);
      }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Roles" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Roles</SelectItem>
        <SelectItem value="Admin">Admin</SelectItem>
        <SelectItem value="Owner">Owner</SelectItem>
        <SelectItem value="Holder">Holder</SelectItem>
      </SelectContent>
    </Select>
  );
}
