"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

type Props = {
  url: string;
  children: React.ReactNode;
};

export default function NavItem({ url, children }: Props) {
  const pathname = usePathname();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === url}>
        {children}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
