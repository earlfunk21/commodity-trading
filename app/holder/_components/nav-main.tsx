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
  HandCoins,
  HomeIcon,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { TbCameraBitcoin } from "react-icons/tb";

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
    title: "Home",
    icon: HomeIcon,
    url: "/",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/holder",
  },
  {
    title: "Purchase Tokens",
    icon: HandCoins,
    url: "/holder/purchase-token",
  },
  {
    title: "Tokens",
    icon: LuChartNoAxesCombined,
    url: "/holder/sub-token",
  },
  {
    title: "Commodities",
    icon: TbCameraBitcoin,
    url: "/holder/commodities",
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
