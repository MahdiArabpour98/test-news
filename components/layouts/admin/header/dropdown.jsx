"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { defaultUser } from "@/constants/images";
import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";

const HeaderDropdown = ({ user }) => {
  const userHook = useUser();

  const router = useRouter();

  const pathname = usePathname();

  const sheetRef = useRef(null);

  useEffect(() => {
    sheetRef?.current?.click();
  }, [pathname]);

  useEffect(() => {
    userHook.setUser(user);
  }, []);

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="mr-auto overflow-hidden rounded-full"
        >
          <Image
            src={defaultUser}
            width={100}
            height={100}
            className="h-full w-full object-cover object-center"
            alt="کاربر"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            {userHook?.user?.fullName && (
              <span className="text-primary">{userHook?.user?.fullName}</span>
            )}
            <span className="text-primary">{userHook?.user?.phoneNumber}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#">ویرایش پروفایل</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-x-1.5">
          <LogOut size={14} strokeWidth={1.5} className="rtl:rotate-180" />
          <span>خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
