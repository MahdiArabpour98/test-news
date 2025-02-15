import { z } from "zod";

const categoryImageSchema = z
  .custom()
  // .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "فایل انتخابی حداکثر باید ۲ مگابایت باشد");

export const categorySchema = z.object({
  title: z.string().min(1, "عنوان الزامی میباشد"),
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۱۰ حرف میباشد"),
      z.string().min(10, "توضیحات حداقل ۱۰ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" || e === null ? undefined : e)),
  image: categoryImageSchema,
});
