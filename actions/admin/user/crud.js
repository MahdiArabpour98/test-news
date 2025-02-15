"use server";

import prismadb from "@/lib/backend/prismadb";
import { userSchema } from "@/lib/validations/user";
import { routes } from "@/routes/routes";
import { revalidatePath } from "next/cache";

export const getAllUsers = async (options) => {
  // check access here

  const page = options?.page || 1;
  const perPage = options?.perPage || 20;
  const skip = (page - 1) * perPage;
  const take = perPage;

  const searchString = options?.q || "";

  const searchFilter = searchString
    ? {
        OR: [
          { fullName: { contains: searchString, mode: "insensitive" } },
          { phoneNumber: { contains: searchString, mode: "insensitive" } },
        ],
      }
    : {};

  const where = searchFilter;

  const total = await prismadb.user.count({ where });
  const data = await prismadb.user.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
  });

  return {
    ok: true,
    status: 200,
    data: {
      data,
      total,
      page,
      perPage,
    },
    message: "داده ها ارسال شدند",
  };
};

export const getUserById = async (id) => {
  // check access here

  const user = await prismadb.user.findUnique({
    where: {
      id,
    },
  });

  return {
    ok: true,
    status: 200,
    data: user,
    message: "داده ها ارسال شدند",
  };
};

export const createUser = async (values) => {
  // check access here

  const validateData = userSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const data = await prismadb.user.create({
    data: values,
  });

  revalidatePath(routes.admin.user.root);

  return {
    ok: true,
    status: 201,
    data,
    message: "کاربر جدید اضافه شد",
  };
};

export const editUser = async (values, id) => {
  // check access here

  const validateData = userSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const checkUser = await prismadb.user.findUnique({
    where: { id },
  });

  if (!checkUser) {
    return {
      ok: false,
      status: 404,
      message: "کاربر مورد نظر پیدا نشد",
    };
  }

  const user = await prismadb.user.update({
    where: { id },
    data: values,
  });

  revalidatePath(routes.admin.user.root);

  return {
    ok: true,
    status: 200,
    data: user,
    message: "کاربر مورد نظر ویرایش شد",
  };
};

export const deleteUser = async (id) => {
  // check access here

  const checkUser = await prismadb.user.findUnique({
    where: { id },
  });

  if (!checkUser) {
    return {
      ok: false,
      status: 404,
      message: "کاربر مورد نظر پیدا نشد",
    };
  }

  await prismadb.user.delete({
    where: { id },
  });

  revalidatePath(routes.admin.user.root);

  return { ok: true, status: 200, message: "کاربر مورد نظر حذف شد" };
};
