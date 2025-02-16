"use client";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

type Props = {
  url: string;
  children: React.ReactNode;
};

export default function NavSubItem({ url, children }: Props) {
  const pathname = usePathname();
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        isActive={pathname === url}>
          {children}
        </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
