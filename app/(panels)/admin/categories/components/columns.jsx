"use client";

import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import { jaliliDateHour } from "@/lib/jalali-date";

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
    accessorKey: "description",
    header: "توضیحات",
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
