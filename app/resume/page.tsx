import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResumeViewer } from "@/components/resume-viewer";
import { Badge } from "@/components/ui/badge";

interface ResumeConfig {
  slug: string;
  tabLabel: string;
  title: string;
  focus: string;
  description: string;
  markdownFile: string;
  pdfHref: string;
}

const resumeConfig: ResumeConfig[] = [
  {
    slug: "ios",
    tabLabel: "iOS Resume",
    title: "iOS-Focused Resume",
    focus: "Swift / UIKit / SwiftUI",
    description:
      "Focused on native iOS architecture, enterprise performance, and platform-level delivery.",
    markdownFile: "ios.md",
    pdfHref: "/resumes/ios-resume.pdf"
  },
  {
    slug: "react-native",
    tabLabel: "React Native Resume",
    title: "React Native-Focused Resume",
    focus: "RN / JS / Native Modules",
    description:
      "Focused on cross-platform React Native systems with native integrations and automation.",
    markdownFile: "react-native.md",
    pdfHref: "/resumes/react-native-resume.pdf"
  }
];

export const metadata: Metadata = {
  title: "Resumes | Vinay Kumar",
  description:
    "Role-specific iOS and React Native resumes rendered from markdown and downloadable as PDFs."
};

async function loadResumes() {
  return Promise.all(
    resumeConfig.map(async (resume) => {
      const markdownPath = path.join(process.cwd(), "content", "resumes", resume.markdownFile);
      const markdown = await fs.readFile(markdownPath, "utf8");
      return { ...resume, markdown };
    })
  );
}

export default async function ResumePage() {
  const resumes = await loadResumes();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="space-y-3">
          <Badge variant="secondary">Resume Library</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">iOS + React Native Resumes</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Two role-targeted resumes are maintained in markdown so updates are quick, versioned,
            and automatically converted into downloadable PDFs.
          </p>
        </div>

        <ResumeViewer resumes={resumes} />
      </main>
      <SiteFooter />
    </div>
  );
}
