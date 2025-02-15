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
import { newsSchema } from "@/lib/validations/news";
import useMount from "@/hooks/use-mount";
import { editNews } from "@/actions/admin/news/crud";
import Editor from "./editor";
import SearchableSelect from "@/components/searchable-select";
import { getAllCategories } from "@/actions/admin/category/crud";
import { getAllUsers } from "@/actions/admin/user/crud";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const EditForm = ({ data }) => {
  const router = useRouter();

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      authorId: data.authorId,
      categoryId: data.categoryId,
      title: data.title,
      slug: data.slug,
      description: data.description || "",
      content: data.content || "",
      elected: data.elected,
      image: null,
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      } else {
        if (key === "elected") {
          formData.append(key, value);
        } else {
          formData.append(key, "");
        }
      }
    });

    const res = await editNews(formData, data.id);
    if (res.ok) {
      toast.success(<ToastSuccess text={res.message} />);
      router.push(routes.admin.news.root);
    } else {
      toast.error(<ToastError text={res.message} />);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="my-3">
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسلاگ</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="اسلاگ"
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته بندی</FormLabel>
                <FormControl>
                  <SearchableSelect
                    api={getAllCategories}
                    defaultInputValue={""}
                    defaultValue={getValues("categoryId")}
                    query="q"
                    placeholder="انتخاب کنید"
                    keyValue="id"
                    searchable={true}
                    changeValue={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="authorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نویسنده</FormLabel>
                <FormControl>
                  <SearchableSelect
                    api={getAllUsers}
                    defaultInputValue={""}
                    defaultValue={getValues("authorId")}
                    query="q"
                    placeholder="انتخاب کنید"
                    keyValue="id"
                    searchable={true}
                    changeValue={(value) => {
                      field.onChange(value);
                    }}
                    showItems={["fullName", "phoneNumber"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="elected"
            render={({ field }) => (
              <FormItem className="mt-auto">
                <div className="flex w-full items-center justify-between rounded-lg border px-4 py-4">
                  <div>
                    <FormLabel>منتخب</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      className="data-[state=checked]:bg-primary"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage
                  className={cn(
                    "text-primary",
                    errors?.colors ? "invisible" : "hidden",
                  )}
                >
                  وضعیت را مشخص نمایید
                </FormMessage>
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

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel>جزئیات خبر</FormLabel>
                <FormControl>
                  <Editor value={field.value} onChange={field.onChange} />
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
    </div>
  );
};

export default EditForm;
