"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const SwitchTheme = () => {
  const { setTheme, theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <div
      className={cn(
        "relative flex h-6 w-11 cursor-pointer items-center gap-1 rounded-xl transition-all duration-200",
        currentTheme === "light" ? "bg-primary" : "bg-gray-700",
      )}
      onClick={() => {
        currentTheme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      <Sun
        className={cn(
          "absolute transition-all duration-200",
          currentTheme === "light"
            ? "right-1 text-accent opacity-100"
            : "right-6 opacity-0",
        )}
        size={18}
      />
      <Moon
        className={cn(
          "absolute transition-all duration-200",
          currentTheme === "dark"
            ? "right-6 text-primary opacity-100"
            : "right-1 opacity-0",
        )}
        size={18}
      />
    </div>
  );
};

export default SwitchTheme;
