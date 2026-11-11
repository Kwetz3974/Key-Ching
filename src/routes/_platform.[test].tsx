import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Lock, ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/platform/PageHeader";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { assessments, formatSats } from "@/lib/sample-data";
import { comingSoon } from "@/lib/coming-soon";

export const Route = createFileRoute("/_platform/test")({
  head: () => ({
    meta: [
      { title: "Test — Key-Ching" },
      { name: "description", content: "Short knowledge assessments that check your Bitcoin self-custody understanding." },
      { property: "og:title", content: "Test — Key-Ching" },
      { property: "og:description", content: "Short knowledge assessments that check your Bitcoin self-custody understanding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 3 · Test"
        title="Knowledge assessments"
        description="Pass an assessment with 80% or more to qualify for its sats reward. You can retry anytime."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {assessments.map((a, i) => {
          const locked = a.status === "locked";
          return (
            <article key={a.id} className="flex flex-col rounded-3xl border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span
                  className={
                    locked
                      ? "grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground"
                      : "grid size-12 place-items-center rounded-2xl bg-navy text-primary"
                  }
                >
                  {locked ? <Lock className="size-5" /> : a.status === "passed" ? <Trophy className="size-5" /> : <ClipboardCheck className="size-5" />}
                </span>
                <StatusBadge status={a.status} />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Assessment {i + 1}</p>
              <h2 className="mt-1 text-xl font-bold">{a.title}</h2>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">{a.questions} questions</span>
                <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-accent-foreground">
                  +{formatSats(a.reward)} sats
                </span>
                {a.score !== undefined && (
                  <span className="rounded-full bg-success-soft px-3 py-1 font-semibold text-success">Score {a.score}%</span>
                )}
              </div>
              <Button
                variant={a.status === "available" ? "hero" : locked ? "secondary" : "outline"}
                disabled={locked}
                onClick={() => comingSoon(a.title)}
                className="mt-6 w-full"
              >
                {a.status === "passed" ? "Review answers" : locked ? "Finish earlier modules to unlock" : "Start assessment"}
                {!locked && <ArrowRight />}
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
