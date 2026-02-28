"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileCode2, Github, Linkedin, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/playground", label: "Playground" }
];

const profileLinks = [
  { href: "https://github.com/vinaykumar0339", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/vinay-kumar-0339/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://dev.to/vinaykumar0339", label: "DEV", Icon: FileCode2 }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            VK
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Vinay Kumar</p>
            <p className="text-xs text-muted-foreground">Mobile Engineer</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Button key={item.href} asChild variant={active ? "secondary" : "ghost"}>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
          </nav>

          <div className="h-5 w-px bg-border" />

          <ThemeToggle />

          <div className="h-5 w-px bg-border" />

          <div className="flex items-center gap-1">
            {profileLinks.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="icon">
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.Icon className="size-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Portfolio Navigation</SheetTitle>
              <SheetDescription>
                Explore projects, resumes, and interactive demos.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 grid gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium",
                      active
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Appearance
              </p>
              <div className="mt-2 px-3">
                <ThemeToggle variant="outline" align="start" />
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Profiles
              </p>
              <div className="mt-2 grid gap-2">
                {profileLinks.map((item) => (
                  <Button key={item.href} asChild variant="outline" size="icon">
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      title={item.label}
                    >
                      <item.Icon className="size-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
