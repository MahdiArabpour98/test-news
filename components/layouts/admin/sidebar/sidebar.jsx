"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Bell, ChevronDown, LogOut, MessageSquare } from "lucide-react";
import { defaultUser, logo } from "@/constants/images";
import { routes } from "@/routes/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { navItems as staticNavItems } from "../nav-items";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const SideBar = ({ user }) => {
  const pathname = usePathname();

  const { open, setOpenMobile, isMobile } = useSidebar();

  const [activeMenu, setActiveMenu] = useState(null);

  const [navItems, setNavItems] = useState(staticNavItems || []);

  const changeActiveMenu = (index, menuIndex) => {
    activeMenu?.index === index && activeMenu?.menuIndex === menuIndex
      ? setActiveMenu(null)
      : setActiveMenu({
          index,
          menuIndex,
        });
  };

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile]);

  return (
    <Sidebar side="right" variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-[60px] border-b bg-muted dark:bg-[#172031]">
        <Link
          href={routes.root.landing}
          className={cn(
            "my-auto flex animate-pulse items-center gap-x-0 px-0",
            (open || isMobile) && "gap-x-2 px-3",
          )}
        >
          <Image
            src={logo}
            width={40}
            height={40}
            alt="logo"
            className={cn(
              "mb-1 h-7 w-8 transition-all duration-200",
              open && "h-8 w-9",
            )}
          />
          <span
            className={cn(
              "invisible text-nowrap text-lg font-normal tracking-wider text-primary",
              (open || isMobile) && "visible",
            )}
          >
            NEWS BREAK
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-muted dark:bg-[#172031]">
        <ScrollArea dir="rtl" className="flex-1 overflow-y-auto">
          <div className="mt-4 px-3">
            <div className="flex items-center justify-between">
              <div className="flex w-fit items-center justify-center overflow-hidden rounded-full">
                <Image
                  src={defaultUser}
                  width={40}
                  height={40}
                  className={cn(
                    "mb-3 h-6 w-6 object-cover object-center transition-all duration-200",
                    open && "mb-0 h-12 w-12",
                  )}
                  alt="کاربر"
                />
              </div>
              <div
                className={cn(
                  "text-paragraph mr-auto hidden items-center gap-3",
                  open && "flex",
                )}
              >
                <MessageSquare
                  size={18}
                  strokeWidth={1.5}
                  className="cursor-pointer transition-all duration-200 hover:text-foreground"
                />
                <Bell
                  size={18}
                  strokeWidth={1.5}
                  className="cursor-pointer transition-all duration-200 hover:text-foreground"
                />
                <LogOut
                  size={18}
                  strokeWidth={1.5}
                  className="rotate-180 cursor-pointer transition-all duration-200 hover:text-foreground"
                />
              </div>
            </div>
          </div>

          {navItems.map((item, index) => {
            if (item.type === "group") {
              return (
                <SidebarGroup
                  key={index}
                  className={cn(
                    "text-paragraph p-1 pl-3",
                    !open && !isMobile && "pl-1 text-foreground",
                  )}
                >
                  {open && (
                    <SidebarGroupLabel className="mt-1 text-xs text-muted-foreground/60">
                      {item.title}
                    </SidebarGroupLabel>
                  )}

                  <SidebarGroupContent>
                    <SidebarMenu className="gap-3">
                      {item.menuItems.map((menuItem, menuIndex) => (
                        <SidebarMenuItem key={menuIndex}>
                          {menuItem.type === "link" &&
                            (open ? (
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === menuItem.href}
                                className="rounded-none border-r-4 border-transparent font-semibold hover:bg-transparent hover:text-primary data-[active=true]:border-primary data-[active=true]:bg-transparent data-[active=true]:text-primary"
                              >
                                <Link href={menuItem.href} onClick={() => {}}>
                                  {menuItem.icon()}
                                  <span className="">{menuItem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            ) : (
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === menuItem.href}
                                className="rounded-none border-r-4 border-transparent font-semibold hover:bg-transparent hover:text-primary data-[active=true]:border-primary data-[active=true]:bg-transparent data-[active=true]:text-primary"
                              >
                                <Link href={menuItem.href}>
                                  {menuItem.icon()}
                                  {isMobile && <span>{menuItem.title}</span>}
                                </Link>
                              </SidebarMenuButton>
                            ))}
                          {menuItem.type === "subMenu" && (
                            <Collapsible
                              open={
                                activeMenu?.index === index &&
                                activeMenu?.menuIndex === menuIndex
                              }
                              defaultOpen={
                                pathname === menuItem.defaultOpen ||
                                pathname.startsWith(menuItem.defaultOpen)
                              }
                              className="group/collapsible"
                            >
                              <CollapsibleTrigger asChild>
                                {open ? (
                                  <SidebarMenuButton
                                    onClick={() =>
                                      changeActiveMenu(index, menuIndex)
                                    }
                                    className={cn(
                                      "rounded-none border-r-4 border-transparent bg-transparent font-semibold hover:bg-transparent hover:text-primary",
                                      "data-[state=open]:border-primary data-[state=open]:bg-transparent data-[state=open]:text-primary data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-primary",
                                    )}
                                  >
                                    <div className="flex items-center gap-2">
                                      {menuItem.icon()}
                                      <span>{menuItem.title}</span>
                                    </div>
                                    <ChevronDown className="mr-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                  </SidebarMenuButton>
                                ) : (
                                  <SidebarMenuButton
                                    className={cn(
                                      "rounded-none border-r-4 border-transparent bg-transparent font-semibold hover:bg-transparent hover:text-primary",
                                      "data-[state=open]:bg-transparent data-[state=open]:text-primary data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-primary",
                                    )}
                                  >
                                    {menuItem.icon()}
                                    {isMobile && <span>{menuItem.title}</span>}
                                    <ChevronDown className="mr-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                  </SidebarMenuButton>
                                )}
                              </CollapsibleTrigger>
                              <CollapsibleContent className="CollapsibleContent">
                                <SidebarGroupContent
                                  className={cn("pr-0", open && "pr-3")}
                                >
                                  <SidebarMenu>
                                    {menuItem.subMenu.map(
                                      (subMenuItem, subMenuIndex) => (
                                        <SidebarMenuItem key={subMenuIndex}>
                                          <SidebarMenuButton
                                            asChild
                                            isActive={
                                              pathname === subMenuItem.href
                                            }
                                            className={cn(
                                              "rounded-none border-transparent text-muted-foreground hover:bg-transparent hover:text-primary data-[active=true]:bg-transparent data-[active=true]:text-primary",
                                              !open &&
                                                "border-r-4 border-transparent data-[active=true]:border-primary",
                                            )}
                                          >
                                            <Link href={subMenuItem.href}>
                                              {subMenuItem.icon(18, 1.5)}
                                              <span>{subMenuItem.title}</span>
                                            </Link>
                                          </SidebarMenuButton>
                                        </SidebarMenuItem>
                                      ),
                                    )}
                                  </SidebarMenu>
                                </SidebarGroupContent>
                              </CollapsibleContent>
                            </Collapsible>
                          )}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            }
          })}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
