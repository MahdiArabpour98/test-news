export const userStatusFa = (title) => {
  switch (title) {
    case "ACTIVE":
      return "فعال";

    case "DEACTIVE":
      return "غیر فعال";

    case "SUSPENSE":
      return "مسدود شده";

    default:
      return title;
  }
};

export const userStatusEn = (title) => {
  switch (title) {
    case "فعال":
      return "ACTIVE";

    case "غیر فعال":
      return "DEACTIVE";

    case "مسدود شده":
      return "SUSPENSE";

    default:
      return title;
  }
};
