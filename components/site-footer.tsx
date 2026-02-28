import Link from "next/link";
import { FileCode2, Github, Linkedin } from "lucide-react";

const profileLinks = [
  { href: "https://github.com/vinaykumar0339", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/vinay-kumar-0339/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://dev.to/vinaykumar0339", label: "DEV", Icon: FileCode2 }
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Vinay Kumar Thippireddy</p>
        <div className="flex flex-wrap items-center gap-3">
          {profileLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              title={item.label}
              className="rounded-md p-2 transition-colors hover:bg-muted"
            >
              <item.Icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
