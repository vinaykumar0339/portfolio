export interface FeaturedProject {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  language: string;
  stars: number;
  updatedAt: string;
  repoUrl: string;
  highlights: string[];
  tech: string[];
  status: "Active" | "Paused" | "Archived";
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "jexlang",
    name: "JexLang",
    tagline: "JavaScript-style expression evaluator",
    description:
      "A lightweight expression language for runtime formulas and dynamic business rules across mobile, backend, and web platforms.",
    category: "Language Engine",
    language: "Swift",
    stars: 3,
    updatedAt: "2025-12-11",
    repoUrl: "https://github.com/vinaykumar0339/jexlang",
    highlights: [
      "Dynamic form and field logic",
      "Runtime configurable business rules",
      "Cross-platform consistency for formula execution"
    ],
    tech: ["Swift", "TypeScript", "Java", "Parser / Interpreter"],
    status: "Active"
  },
  {
    slug: "swift-ui-navigation",
    name: "Swift UI Navigation",
    tagline: "Type-safe navigation library for SwiftUI",
    description:
      "A clean navigation framework inspired by React Navigation with stack and tab APIs, type-safe routes, and decoupled navigation logic.",
    category: "iOS Framework",
    language: "Swift",
    stars: 0,
    updatedAt: "2025-12-31",
    repoUrl: "https://github.com/vinaykumar0339/swift-ui-navigation",
    highlights: [
      "Stack, tab, sheet, and modal patterns",
      "Type-safe routes with route params",
      "Screen options and dynamic header controls"
    ],
    tech: ["Swift", "SwiftUI", "SPM"],
    status: "Active"
  },
  {
    slug: "appium-xcuitest-driver",
    name: "Appium XCUITest Driver",
    tagline: "iOS automation contribution fork",
    description:
      "Contribution workspace around Appium's iOS driver focused on XCUITest performance and reliable element tree/page source retrieval.",
    category: "Automation",
    language: "Objective-C / JS",
    stars: 0,
    updatedAt: "2025-06-10",
    repoUrl: "https://github.com/vinaykumar0339/appium-xcuitest-driver",
    highlights: [
      "Snapshot API performance direction",
      "Faster source generation exploration",
      "Enterprise test stability improvements"
    ],
    tech: ["Appium", "XCUITest", "Node.js"],
    status: "Active"
  }
];

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}
