import { format, newDate } from "date-fns-jalali";

export const jaliliDate = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "yyyy/MM/dd");
};

export const jaliliDateFilter = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "yyyy-MM-dd");
};

export const jaliliHour = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "HH:mm");
};

export const jaliliDateDay = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "dd");
};

export const jaliliDateMonth = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "MM");
};

export const jaliliDateYear = (date) => {
  if (!date) {
    return null;
  }

  return format(new Date(date), "yyyy");
};

export const jaliliDateHour = (date) => {
  if (!date) {
    return null;
  }
  return format(new Date(date), "HH:mm yyyy/MM/dd");
};
