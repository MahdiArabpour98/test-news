"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import { categorySchema } from "@/lib/validations/category";
import useMount from "@/hooks/use-mount";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Modal } from "@/components/modal";
import { editCategory } from "@/actions/admin/category/crud";

const EditForm = ({ data }) => {
  const mount = useMount();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: data.title,
      description: data.description || "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    for (const key in values) {
      if (!values[key]) {
        values[key] = "";
      }
    }

    const res = await editCategory(values, data.id);
    if (res.ok) {
      toast.success(<ToastSuccess text={res.message} />);
      onClose();
    } else {
      toast.error(<ToastError text={res.message} />);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="border-blue-600 text-blue-600 hover:bg-blue-600"
      >
        <Edit size={14} strokeWidth={1.5} />
      </Button>
      <Modal
        title={"ویرایش کاربر"}
        isOpen={isOpen}
        onClose={onClose}
        className="max-h-[calc(100vh-50px)] max-w-[calc(100vw-300px)] overflow-auto"
      >
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 grid w-full grid-cols-1 gap-4 md:grid-cols-3"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="عنوان"
                      {...field}
                      className="focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="توضیحات"
                      className="h-24 resize-y focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-3">
              <SubmitButton loading={isSubmitting}>ویرایش</SubmitButton>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default EditForm;
