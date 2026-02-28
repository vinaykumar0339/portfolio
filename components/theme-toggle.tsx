"use client";

import type { ComponentProps } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ThemeToggleProps {
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
  align?: "start" | "center" | "end";
}

export function ThemeToggle({ variant = "ghost", className, align = "end" }: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const selectedTheme = theme ?? "system";
  const isDark = currentTheme === "dark";
  const label = isDark ? "Dark theme selected" : "Light or system theme selected";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant={variant}
          className={className}
          aria-label="Change theme"
          title={label}
        >
          {selectedTheme === "system" ? (
            <Laptop className="size-4" />
          ) : isDark ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-44">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedTheme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
