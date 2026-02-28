import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JexlangPlayground } from "@/components/jexlang-playground";
import { SwiftNavigationSamples } from "@/components/swift-navigation-samples";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const metadata = {
  title: "Playground | Vinay Kumar",
  description:
    "Interactive JexLang playground powered by jexlang-ts and Swift UI Navigation README-based sample examples."
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="space-y-3">
          <Badge variant="secondary">Interactive Demos</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Project Playground</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            JexLang playground uses the official <code>jexlang-ts</code> API with customizable
            functions/transforms. Swift UI Navigation is presented with real sample snippets from
            your repository documentation.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <JexlangPlayground />
          <SwiftNavigationSamples />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reference Repositories</CardTitle>
            <CardDescription>Direct links to source repos used for these demos.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="https://github.com/vinaykumar0339/jexlang" target="_blank">
                JexLang Repo <ArrowUpRight className="size-3" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="https://github.com/vinaykumar0339/swift-ui-navigation" target="_blank">
                Swift UI Navigation Repo <ArrowUpRight className="size-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
