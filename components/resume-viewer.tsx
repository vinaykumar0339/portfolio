"use client";

import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { ResumeMarkdown } from "@/components/resume-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResumeItem {
  slug: string;
  tabLabel: string;
  title: string;
  focus: string;
  description: string;
  markdownFile: string;
  pdfHref: string;
  markdown: string;
}

interface ResumeViewerProps {
  resumes: ResumeItem[];
}

export function ResumeViewer({ resumes }: ResumeViewerProps) {
  if (!resumes.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No resumes found</CardTitle>
          <CardDescription>Expected markdown files under content/resumes.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={resumes[0].slug} className="gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabsList>
          {resumes.map((resume) => (
            <TabsTrigger key={resume.slug} value={resume.slug}>
              {resume.tabLabel}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex flex-wrap gap-2">
          {resumes.map((resume) => (
            <Button key={resume.slug} asChild size="sm" variant="outline">
              <Link href={resume.pdfHref} target="_blank" rel="noreferrer">
                <Download className="size-3.5" /> {resume.tabLabel} PDF
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {resumes.map((resume) => (
        <TabsContent key={resume.slug} value={resume.slug}>
          <Card className="border-border/70 bg-card/80">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-4" />
                    {resume.title}
                    <Badge variant="secondary">{resume.focus}</Badge>
                  </CardTitle>
                  <CardDescription>{resume.description}</CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link href={resume.pdfHref} target="_blank" rel="noreferrer">
                    <Download className="size-3.5" /> Download PDF
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Update this resume in{" "}
                <code>{`content/resumes/${resume.markdownFile}`}</code>. PDF output is generated
                from markdown via <code>npm run generate:resumes</code>.
              </p>
            </CardHeader>
            <CardContent>
              <ResumeMarkdown markdown={resume.markdown} />
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
