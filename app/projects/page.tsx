import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectsTabs } from "@/components/projects-tabs";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Projects | Vinay Kumar",
  description: "Repository showcase for Vinay Kumar's mobile, automation, and product projects."
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="space-y-3">
          <Badge variant="secondary">GitHub Showcase</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Project Catalog</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            A curated portfolio of repositories from your GitHub account, grouped by product
            category and technical focus.
          </p>
        </div>

        <ProjectsTabs />
      </main>
      <SiteFooter />
    </div>
  );
}
