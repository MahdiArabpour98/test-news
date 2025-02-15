"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
}) => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={`آیا از حذف ${description} مورد نظر مطمئن هستید؟`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mr-2 flex w-full items-center justify-start gap-3 space-x-2 pt-6">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
          className="h-9"
        >
          لغو
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
          className="flex h-9 items-center justify-center gap-2"
        >
          <span>حذف</span>
          {loading && (
            <span className="animate-spin">
              <LoaderCircle size={18} strokeWidth={2} />
            </span>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
