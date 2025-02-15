"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import useMount from "@/hooks/use-mount";

export const ThemeProvider = ({ children, ...props }) => {
  const mount = useMount();
  if (!mount) return null;
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
