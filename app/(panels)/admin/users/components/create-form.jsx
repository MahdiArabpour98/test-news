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
import { userSchema } from "@/lib/validations/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal } from "@/components/modal";
import useMount from "@/hooks/use-mount";
import { createUser } from "@/actions/admin/user/crud";
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
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      nationalCode: "",
      email: "",
      address: "",
      status: "ACTIVE",
      image: null,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const res = await createUser(values);
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="نام و نام خانوادگی"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="شماره تماس"
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
              name="nationalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="off"
                      placeholder="کد ملی"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="ایمیل"
                      {...field}
                      className="focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وضعیت</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="وضعیت" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">فعال</SelectItem>
                      <SelectItem value="DEACTIVE">غیر فعال</SelectItem>
                      <SelectItem value="SUSPENSE">مسدود شده</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="آدرس"
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
