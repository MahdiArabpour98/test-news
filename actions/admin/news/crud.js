"use server";

import prismadb from "@/lib/backend/prismadb";
import { newsSchema } from "@/lib/validations/news";
import { routes } from "@/routes/routes";
import { revalidatePath } from "next/cache";

export const getAllNews = async (options) => {
  // check access here

  const page = options?.page || 1;
  const perPage = options?.perPage || 20;
  const skip = (page - 1) * perPage;
  const take = perPage;

  const searchString = options?.q || "";

  const searchFilter = searchString
    ? {
        OR: [
          { title: { contains: searchString, mode: "insensitive" } },
          { description: { contains: searchString, mode: "insensitive" } },
        ],
      }
    : {};

  const where = searchFilter;

  const total = await prismadb.news.count({ where });
  const data = await prismadb.news.findMany({
    where,
    include: { author: true, category: true },
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
export const getAllElectedNews = async () => {
  const data = await prismadb.news.findMany({
    where: { elected: true },
    include: { author: true, category: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    ok: true,
    status: 200,
    data: {
      data,
    },
    message: "داده ها ارسال شدند",
  };
};

export const getNewsById = async (id) => {
  // check access here

  const news = await prismadb.news.findUnique({
    where: {
      id,
    },
    include: { author: true, category: true },
  });

  return {
    ok: true,
    status: 200,
    data: news,
    message: "داده ها ارسال شدند",
  };
};

export const createNews = async (formData) => {
  // check access here

  const values = Object.fromEntries(formData.entries());

  if (values.elected) {
    values.elected = values?.elected === "true" ? true : false;
  }

  const validateData = newsSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const data = await prismadb.news.create({
    data: { ...values, image: null, thumbnail: null },
  });

  revalidatePath(routes.admin.news.root);

  return {
    ok: true,
    status: 201,
    data,
    message: "خبر جدید اضافه شد",
  };
};

export const editNews = async (formData, id) => {
  // check access here

  const values = Object.fromEntries(formData.entries());

  if (values.elected) {
    values.elected = values?.elected === "true" ? true : false;
  }

  const validateData = newsSchema.safeParse(values);

  if (!validateData.success) {
    return {
      ok: false,
      status: 400,
      message: "فرمت دیتای ارسالی صحیح نمیباشد",
      errors: validateData.error.flatten().fieldErrors,
    };
  }

  const checkNews = await prismadb.news.findUnique({
    where: { id },
  });

  if (!checkNews) {
    return {
      ok: false,
      status: 404,
      message: "خبر مورد نظر پیدا نشد",
    };
  }

  const news = await prismadb.news.update({
    where: { id },
    data: { ...values, image: null, thumbnail: null },
  });

  revalidatePath(routes.admin.news.root);

  return {
    ok: true,
    status: 200,
    data: news,
    message: "خبر مورد نظر ویرایش شد",
  };
};

export const deleteNews = async (id) => {
  // check access here

  const checkNews = await prismadb.news.findUnique({
    where: { id },
  });

  if (!checkNews) {
    return {
      ok: false,
      status: 404,
      message: "خبر مورد نظر پیدا نشد",
    };
  }

  await prismadb.news.delete({
    where: { id },
  });

  revalidatePath(routes.admin.news.root);

  return { ok: true, status: 200, message: "خبر مورد نظر حذف شد" };
};
