import { z } from "zod";

const newsImageSchema = z
  .custom()
  // .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "فایل انتخابی حداکثر باید ۲ مگابایت باشد");

export const newsSchema = z.object({
  authorId: z.string().min(1, "انتخاب نویسنده الزامی میباشد"),
  categoryId: z.string().min(1, "انتخاب دسته بندی الزامی میباشد"),
  title: z.string().min(1, "عنوان الزامی میباشد"),
  slug: z.string().min(1, "اسلاگ الزامی میباشد"),
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۱۰ حرف میباشد"),
      z.string().min(10, "توضیحات حداقل ۱۰ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  content: z
    .union([
      z.string().length(0, "توضیحات تکمیلی در صورت نیاز حداقل ۱۰ حرف میباشد"),
      z.string().min(10, "توضیحات تکمیلی حداقل ۱۰ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  elected: z.boolean(),
  image: newsImageSchema,
});
