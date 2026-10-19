"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import SquishSwitch from "./SquishSwitch";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialDark = storedTheme === "dark" || (!storedTheme && (hasDarkClass || prefersDark));
    setIsDark(initialDark);

    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setIsDark(customEvent.detail === "dark");
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const handleToggle = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: checked ? "dark" : "light" })
    );
  };

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.12] backdrop-blur-md w-[82px] h-[32px] ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] border border-black/[0.06] dark:border-white/[0.12] backdrop-blur-md shadow-xs transition-all ${className}`}
      title={isDark ? "Switch to Light Ambient Theme" : "Switch to Deep Emerald Dark Theme"}
    >
      <Sun
        className={`w-3.5 h-3.5 transition-all duration-300 ${
          !isDark
            ? "text-turmeric-600 scale-110 drop-shadow-[0_0_6px_rgba(242,179,27,0.6)]"
            : "text-ink-400/60 dark:text-rice-200/40 scale-90"
        }`}
        aria-hidden="true"
      />

      <SquishSwitch
        checked={isDark}
        onChange={handleToggle}
        ariaLabel={isDark ? "Switch to Light Theme" : "Switch to Deep Emerald Dark Theme"}
        trackColor="#E1ECE5"
        trackOnColor="#081C14"
        thumbColor="#F2B31B"
        thumbOnColor="#FDE8A8"
        width={46}
        height={22}
        radius={11}
        speed={55}
        stretch={28}
        hoverScale={1.05}
        colorDuration={300}
      />

      <Moon
        className={`w-3.5 h-3.5 transition-all duration-300 ${
          isDark
            ? "text-turmeric-400 scale-110 drop-shadow-[0_0_8px_rgba(247,197,69,0.7)]"
            : "text-ink-400/60 dark:text-rice-200/40 scale-90"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
