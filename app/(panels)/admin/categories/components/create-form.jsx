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
import { Modal } from "@/components/modal";
import useMount from "@/hooks/use-mount";
import { createCategory } from "@/actions/admin/category/crud";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

const CreateForm = () => {
  const mount = useMount();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const res = await createCategory(values);
    if (res.ok) {
      toast.success(<ToastSuccess text={res.message} />);
      reset();
      onClose();
    } else {
      toast.error(<ToastError text={res.message} />);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="my-3">
      <Button variant="ghost2" onClick={() => setIsOpen(true)}>
        <FilePlus className="h-4 w-4 text-foreground group-hover:text-primary" />
        <span className="text-sm font-normal text-foreground group-hover:text-primary">
          افزودن
        </span>
      </Button>
      <Modal
        title={"ایجاد کاربر"}
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
              <SubmitButton loading={isSubmitting}>ارسال</SubmitButton>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateForm;
