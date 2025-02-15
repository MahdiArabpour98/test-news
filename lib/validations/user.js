import { z } from "zod";

export const userSchema = z.object({
  fullName: z
    .string()
    .min(3, "نام و نام خانوادگی الزامی میباشد و میبایست حداقل ۳ کاراکتر باشد")
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .min(
          3,
          "نام و نام خانوادگی الزامی میباشد و میبایست حداقل ۳ کاراکتر باشد",
        ),
    ),
  phoneNumber: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z
    .union([
      z.string().length(0, "فرمت ایمیل صحیح نمیباشد"),
      z
        .string()
        .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
        .email("فرمت ایمیل صحیح نمیباشد"),
    ])
    .optional()
    .nullable()
    .transform((e) => (e === "" ? undefined : e)),
  address: z
    .union([
      z.string().length(0, "آدرس در صورت نیاز حداقل ۱۰ حرف میباشد"),
      z.string().min(10, "آدرس حداقل ۱۰ حرف میباشد"),
    ])
    .optional()
    .nullable()
    .transform((e) => (e === "" ? undefined : e)),
  nationalCode: z
    .union([
      z.string().length(0, "کد ملی باید ۱۰ رقم باشد"),
      z
        .string()
        .min(10, "کد ملی باید ۱۰ رقم باشد")
        .max(10, "کد ملی باید ۱۰ رقم باشد"),
    ])
    .optional()
    .nullable()
    .transform((e) => (e === "" ? undefined : e)),
  // role: z.string().min(1),
  // roles: z
  //   .array(
  //     z.object({
  //       id: z.string(),
  //       roleName: z.string(),
  //     }),
  //   )
  //   .min(1, "انتخاب حداقل یک سطح دسترسی الزامی میباشد"),
  status: z.string().min(1),
});
