"use client";

import RowNumber from "@/components/row-number";
import CellAction from "./cell-action";
import Image from "next/image";
import { defaultUser } from "@/constants/images";
import { jaliliDateHour } from "@/lib/jalali-date";
import { Badge } from "@/components/ui/badge";
import { userStatusFa } from "@/lib/user-status";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <RowNumber number={row.index + 1} />;
    },
  },
  {
    id: "image",
    header: "تصویر",
    cell: ({ row }) => (
      <Image
        src={
          row.original?.thumbnail || row.original?.profileImage || defaultUser
        }
        alt=""
        width={100}
        height={100}
        className="mx-auto h-10 max-h-full w-10 max-w-full rounded-full object-cover object-center"
      />
    ),
  },
  {
    accessorKey: "fullName",
    header: "نام و نام خانوادگی",
  },
  {
    id: "phoneNumber",
    header: "شماره تماس",
    cell: ({ row }) => <span>{row.original?.phoneNumber}</span>,
  },
  {
    id: "nationalCode",
    header: "کد ملی",
    cell: ({ row }) => <span>{row.original?.nationalCode}</span>,
  },
  {
    id: "status",
    header: "وضعیت",
    cell: ({ row }) => (
      <>
        {row.original?.status === "ACTIVE" && (
          <Badge variant="success">{userStatusFa(row.original?.status)}</Badge>
        )}
        {row.original?.status === "DEACTIVE" && (
          <Badge variant="pending">{userStatusFa(row.original?.status)}</Badge>
        )}
        {row.original?.status === "SUSPENSE" && (
          <Badge variant="destructive">
            {userStatusFa(row.original?.status)}
          </Badge>
        )}
      </>
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
