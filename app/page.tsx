import Link from "next/link";
import { ArrowRight, Download, FileCode2, Github, Linkedin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { featuredProjects } from "@/lib/project-data";

const heroStats = [
  { value: "5+", label: "Years in mobile engineering" },
  { value: "60-70%", label: "Hierarchy performance improvement" },
  { value: "50%", label: "Manual QA effort reduction" },
  { value: "3x", label: "Automation element retrieval performance" }
];

const highlights = [
  "Senior Member of Technical Staff at Vymo Technologies",
  "Swift, SwiftUI, UIKit, React Native, Appium automation",
  "Offline-first architecture, enterprise mobile security, CI/CD"
];

const knownLanguages = ["Swift", "Objective-C", "JavaScript", "TypeScript", "Java"];

const coreSkills = [
  "SwiftUI",
  "UIKit",
  "React Native",
  "Appium",
  "Offline-first Architecture",
  "CI/CD",
  "Native Module Integration",
  "Enterprise Mobile Security"
];

const profileLinks = [
  { href: "https://github.com/vinaykumar0339", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/vinay-kumar-0339/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://dev.to/vinaykumar0339", label: "DEV", Icon: FileCode2 }
];

export default function HomePage() {
  const spotlight = featuredProjects.slice(0, 3);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.08),transparent_35%)]">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="text-3xl leading-tight sm:text-4xl">
                Vinay Kumar Thippireddy
              </CardTitle>
              <CardDescription className="text-base">
                Mobile engineer focused on high-performance iOS and React Native systems,
                platform-level automation, and reusable architecture.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {highlights.map((item) => (
                  <li key={item} className="rounded-md border bg-muted/30 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/20 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Known Languages
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {knownLanguages.map((language) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/20 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Core Skills
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {coreSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/projects" className="gap-2">
                    Explore Projects <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/playground">Open Demo Playground</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/resume">View Resumes</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Button asChild variant="ghost" size="sm" className="gap-1 px-0">
                  <Link href="/resumes/ios-resume.pdf" target="_blank">
                    <Download className="size-3" /> iOS Resume
                  </Link>
                </Button>
                <span>•</span>
                <Button asChild variant="ghost" size="sm" className="gap-1 px-0">
                  <Link href="/resumes/react-native-resume.pdf" target="_blank">
                    <Download className="size-3" /> React Native Resume
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle>Impact Snapshot</CardTitle>
              <CardDescription>Delivery metrics from recent product and platform work.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured Repositories</h2>
              <p className="text-sm text-muted-foreground">
                Sourced from your GitHub profile and mapped into portfolio-ready case studies.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/projects">See all projects</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {spotlight.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <Separator />

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Playground</CardTitle>
              <CardDescription>Try JexLang and navigation demos interactively.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary">
                <Link href="/playground">Open demos</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Profiles</CardTitle>
              <CardDescription>GitHub, LinkedIn, and DEV profile links.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profileLinks.map((item) => (
                <Button key={item.href} asChild size="icon" variant="outline">
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
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
