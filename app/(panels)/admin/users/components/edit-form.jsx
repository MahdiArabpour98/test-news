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
import useMount from "@/hooks/use-mount";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Modal } from "@/components/modal";
import { editUser } from "@/actions/admin/user/crud";

const EditForm = ({ data }) => {
  const mount = useMount();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      nationalCode: data.nationalCode || "",
      email: data.email || "",
      address: data.address || "",
      status: data.status,
      image: null,
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

    const res = await editUser(values, data.id);
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
                  <FormMessage className="text-primary" />
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
                  <FormMessage className="text-primary" />
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
                  <FormMessage className="text-primary" />
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
                  <FormMessage className="text-primary" />
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
                  <FormMessage className="text-primary" />
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
