"use client";

import { cn } from "@/lib/utils";
import ReactTimeago from "react-timeago";

const Timestamp = ({ date, className, type }) => {
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedSeconds} : ${returnedMinutes}`;
  };

  return (
    <ReactTimeago
      className={cn(
        "pt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400",
        className,
      )}
      date={date}
      formatter={(value, unit, suffix, epochMiliseconds, nextFormatter) => {
        // Example: if its 7 min, return "7m", if its 7 hours, return "7h" like that
        if (unit === "second") {
          return `${value} ${"ثانیه"} ${"قبل"}`;
        } else if (unit === "minute") {
          return `${value} ${"دقیقه"} ${"قبل"}`;
        } else if (unit === "hour") {
          return `${value} ${"ساعت"} ${"قبل"}`;
        } else if (unit === "day") {
          return `${value} ${"روز"} ${"قبل"}`;
        } else if (unit === "week") {
          return `${value} ${"هفته"} ${"قبل"}`;
        } else if (unit === "month") {
          return `${value} ${"ماه"} ${"قبل"}`;
        } else if (unit === "year") {
          return `${value} ${"سال"} ${"قبل"}`;
        } else {
          return nextFormatter?.(value, unit, suffix, epochMiliseconds);
        }
      }}
    />
  );
};

export default Timestamp;
