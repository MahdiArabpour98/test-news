export const routes = {
  root: {
    landing: "/",
    news: {
      root: "/news",
      details: (id) => `/news/${id}`,
    },
  },
  admin: {
    dashboard: "/admin/dashboard",
    user: {
      root: "/admin/users",
    },
    category: {
      root: "/admin/categories",
    },
    news: {
      root: "/admin/news",
      create: "/admin/news/create",
      edit: (id) => `/admin/news/${id}/edit`,
    },
  },
};
