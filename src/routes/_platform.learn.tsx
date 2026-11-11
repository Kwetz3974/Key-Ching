import { createFileRoute } from "@tanstack/react-router";
import { Clock, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/platform/PageHeader";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { modules } from "@/lib/sample-data";
import { comingSoon } from "@/lib/coming-soon";

export const Route = createFileRoute("/_platform/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Key-Ching" },
      { name: "description", content: "Plain-language lessons on Bitcoin keys, backups, scams and self-custody." },
      { property: "og:title", content: "Learn — Key-Ching" },
      { property: "og:description", content: "Plain-language lessons on Bitcoin keys, backups, scams and self-custody." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 1 · Learn"
        title="Learning modules"
        description="Short lessons written for everyone. Complete each module to unlock the next one."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((m, i) => {
          const locked = m.status === "locked";
          const pct = (m.completed / m.lessons) * 100;
          return (
            <article
              key={m.id}
              className={
                locked
                  ? "flex flex-col rounded-3xl border bg-card/60 p-6"
                  : "flex flex-col rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              }
            >
              <div className="flex items-start justify-between">
                <span
                  className={
                    locked
                      ? "grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground"
                      : "grid size-12 place-items-center rounded-2xl bg-navy text-primary"
                  }
                >
                  {locked ? <Lock className="size-5" /> : <m.icon className="size-6" />}
                </span>
                <StatusBadge status={m.status} />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Module {i + 1}</p>
              <h2 className="mt-1 text-xl font-bold">{m.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.summary}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{m.lessons} lessons</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {m.minutes} min
                </span>
              </div>
              <Progress value={pct} className="mt-2 h-1.5 bg-muted" />
              <Button
                variant={m.status === "in-progress" ? "hero" : locked ? "secondary" : "navy"}
                className="mt-5 w-full"
                disabled={locked}
                onClick={() => comingSoon(m.title)}
              >
                {m.status === "completed" ? "Review" : m.status === "in-progress" ? "Continue" : locked ? "Locked" : "Start"}
                {!locked && <ArrowRight />}
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
