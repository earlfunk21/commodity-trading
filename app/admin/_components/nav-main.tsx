import NavItem from "@/app/admin/_components/nav-item";
import NavSubItem from "@/app/admin/_components/nav-sub-item";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  LayoutDashboard,
  TicketsPlane,
  Users,
} from "lucide-react";
import Link from "next/link";
import { LuChartNoAxesCombined } from "react-icons/lu";

type ItemProps = {
  title: string;
  icon?: React.ComponentType;
  url?: string;
  items?: {
    title: string;
    icon?: React.ComponentType;
    url: string;
  }[];
};

const items: ItemProps[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    title: "Users",
    icon: Users,
    items: [
      { title: "All Users", url: "/admin/user" },
      { title: "All Admins", url: "/admin/admin" },
      { title: "All Holders", url: "/admin/holder" },
    ],
  },
  {
    title: "Pooling",
    icon: LuChartNoAxesCombined,
    items: [
      { title: "All Blogs", url: "/admin/blog" },
      { title: "All Commodities", url: "/admin/commodity" },
      { title: "All Types", url: "/admin/commodity-type" },
      { title: "All Main Tokens", url: "/admin/main-token" },
    ],
  },
  {
    title: "Accounting",
    icon: TicketsPlane,
    items: [
      { title: "All Complans", url: "/admin/complan" },
      { title: "All Account Deposit", url: "/admin/account-deposit" },
      { title: "All Allocation Account", url: "/admin/allocation-account" },
    ],
  },
];

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) =>
          item.url ? (
            <NavItem url={item.url} key={index}>
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </NavItem>
          ) : (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem, index) => (
                      <NavSubItem key={index} url={subItem.url}>
                        <Link href={subItem.url}>
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                        </Link>
                      </NavSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
