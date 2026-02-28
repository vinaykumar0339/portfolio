import Link from "next/link";
import { ArrowUpRight, CalendarDays, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { formatDate, type FeaturedProject } from "@/lib/project-data";

interface ProjectCardProps {
  project: FeaturedProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full border-border/70">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant="outline">{project.status}</Badge>
        </div>
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">{project.description}</p>

        <ul className="grid gap-2">
          {project.highlights.map((item) => (
            <li key={item} className="rounded-md border bg-muted/30 px-3 py-2 text-xs">
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" /> {project.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3" /> {formatDate(project.updatedAt)}
          </span>
        </div>
        <Button asChild size="sm" variant="ghost" className="gap-1 px-0">
          <Link href={project.repoUrl} target="_blank">
            View Repo <ArrowUpRight className="size-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
