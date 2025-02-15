"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteModal from "@/components/modals/delete-modal";
import { Button } from "@/components/ui/button";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { deleteNews } from "@/actions/admin/news/crud";
import EditForm from "./edit-form";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { Edit } from "lucide-react";

const CellAction = ({ data }) => {
  const [loading, startTransition] = useTransition(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    const res = await deleteNews(data.id);

    if (res.ok) {
      toast.success(<ToastSuccess text={res.message} />);
      setOpen(false);
    } else {
      toast.error(<ToastError text={res.message} />);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <DeleteModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => startTransition(onDelete)}
        title={"حذف"}
        description={"آیتم"}
      />
      <div className="flex items-center gap-2">
        <Link href={routes.admin.news.edit(data.id)}>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-600"
          >
            <Edit size={14} strokeWidth={1.5} />
          </Button>
        </Link>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="sm"
          className="border-rose-500 text-rose-500 hover:bg-rose-500"
        >
          <Trash2 size={16} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};

export default CellAction;
