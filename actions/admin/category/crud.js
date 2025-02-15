"use server";

import prismadb from "@/lib/backend/prismadb";
import { categorySchema } from "@/lib/validations/category";
import { routes } from "@/routes/routes";
import { revalidatePath } from "next/cache";

export const getAllCategories = async (options) => {
  // check access here

  const page = options?.page || 1;
  const perPage = options?.perPage || 20;
  const skip = (page - 1) * perPage;
  const take = perPage;

  const searchString = options?.q || "";

  const searchFilter = searchString
    ? {
        OR: [{ title: { contains: searchString, mode: "insensitive" } }],
      }
    : {};

  const where = searchFilter;

  const total = await prismadb.category.count({ where });
  const data = await prismadb.category.findMany({
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

export const getCategoryById = async (id) => {
  // check access here

  const category = await prismadb.category.findUnique({
    where: {
      id,
    },
  });

  return {
    ok: true,
    status: 200,
    data: category,
    message: "داده ها ارسال شدند",
  };
};

export const createCategory = async (values) => {
  // check access here

  const validateData = categorySchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const data = await prismadb.category.create({
    data: values,
  });

  revalidatePath(routes.admin.category.root);

  return {
    ok: true,
    status: 201,
    data,
    message: "دسته بندی جدید اضافه شد",
  };
};

export const editCategory = async (values, id) => {
  // check access here

  const validateData = categorySchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const checkCategory = await prismadb.category.findUnique({
    where: { id },
  });

  if (!checkCategory) {
    return {
      ok: false,
      status: 404,
      message: "دسته بندی مورد نظر پیدا نشد",
    };
  }

  const category = await prismadb.category.update({
    where: { id },
    data: values,
  });

  revalidatePath(routes.admin.category.root);

  return {
    ok: true,
    status: 200,
    data: category,
    message: "دسته بندی مورد نظر ویرایش شد",
  };
};

export const deleteCategory = async (id) => {
  // check access here

  const checkCategory = await prismadb.category.findUnique({
    where: { id },
  });

  if (!checkCategory) {
    return {
      ok: false,
      status: 404,
      message: "دسته بندی مورد نظر پیدا نشد",
    };
  }

  await prismadb.category.delete({
    where: { id },
  });

  revalidatePath(routes.admin.category.root);

  return { ok: true, status: 200, message: "دسته بندی مورد نظر حذف شد" };
};
