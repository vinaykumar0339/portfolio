"use client";

import { useMemo } from "react";
import { featuredProjects } from "@/lib/project-data";
import { ProjectCard } from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectsTabs() {
  const categories = useMemo(() => {
    const unique = [...new Set(featuredProjects.map((project) => project.category))];
    return ["All", ...unique];
  }, []);

  const projectByCategory = useMemo(() => {
    const map = new Map();
    map.set("All", featuredProjects);
    categories.forEach((category) => {
      if (category === "All") return;
      map.set(
        category,
        featuredProjects.filter((project) => project.category === category)
      );
    });
    return map;
  }, [categories]);

  return (
    <Tabs defaultValue="All" className="space-y-4">
      <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="rounded-full border px-3 py-1.5 text-xs">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => {
        const projects = projectByCategory.get(category) || [];
        return (
          <TabsContent key={category} value={category}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
