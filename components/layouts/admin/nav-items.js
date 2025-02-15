import { routes } from "@/routes/routes";
import { LayoutDashboard } from "lucide-react";
import { PlusCircle, FolderOpen, List, Users, Newspaper } from "lucide-react";

export const navItems = [
  {
    title: "داشبورد",
    type: "group",
    menuItems: [
      {
        title: "داشبورد",
        type: "link",
        href: routes.admin.dashboard,
        defaultOpen: routes.admin.dashboard,
        icon: (size, strokeWidth) => (
          <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
        subMenu: [],
      },
    ],
  },
  {
    title: "مدیریت کاربران",
    type: "group",
    menuItems: [
      {
        title: "کاربران",
        type: "link",
        href: routes.admin.user.root,
        defaultOpen: routes.admin.user.root,
        icon: (size, strokeWidth) => (
          <Users size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
        subMenu: [],
      },
    ],
  },
  {
    title: "مدیریت اخبار و مقالات",
    type: "group",
    menuItems: [
      {
        title: "دسته بندی ها",
        type: "link",
        href: routes.admin.category.root,
        defaultOpen: routes.admin.category.root,
        icon: (size, strokeWidth) => (
          <FolderOpen size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
        subMenu: [],
      },
      {
        title: "اخبار و مقالات",
        type: "subMenu",
        defaultOpen: routes.admin.news.root,
        icon: (size, strokeWidth) => (
          <Newspaper size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
        subMenu: [
          {
            title: "تمامی اخبار",
            href: routes.admin.news.root,
            icon: (size, strokeWidth) => (
              <List size={size || 18} strokeWidth={strokeWidth || 1.5} />
            ),
          },
          {
            title: "افزودن",
            href: routes.admin.news.create,
            icon: (size, strokeWidth) => (
              <PlusCircle size={size || 18} strokeWidth={strokeWidth || 1.5} />
            ),
          },
        ],
      },
    ],
  },
];
