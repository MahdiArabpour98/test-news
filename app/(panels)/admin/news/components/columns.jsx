"use client";

import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { jaliliDateHour } from "@/lib/jalali-date";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },
  {
    accessorKey: "title",
    header: "عنوان",
  },
  {
    id: "authorId",
    header: "نویسنده",
    cell: ({ row }) => <span>{row.original?.author?.fullName}</span>,
  },
  {
    id: "categoryId",
    header: "دسته بندی",
    cell: ({ row }) => <span>{row.original?.category?.title}</span>,
  },
  {
    accessorKey: "elected",
    header: "منتخب",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original?.elected ? (
          <CheckCircle size={18} strokeWidth={2} className="text-teal-500" />
        ) : (
          <XCircle size={18} strokeWidth={2} className="text-rose-500" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => (
      <span>
        {row.original?.description &&
          (row.original?.description).substring(0, 100)}
      </span>
    ),
  },
  {
    id: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => <span>{jaliliDateHour(row.original?.createdAt)}</span>,
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} key={row.original.id} />,
  },
];
