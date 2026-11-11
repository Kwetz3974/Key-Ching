import { createFileRoute } from "@tanstack/react-router";
import { Gamepad2, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/platform/PageHeader";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { simulations } from "@/lib/sample-data";
import { comingSoon } from "@/lib/coming-soon";

export const Route = createFileRoute("/_platform/simulate")({
  head: () => ({
    meta: [
      { title: "Simulate — Key-Ching" },
      { name: "description", content: "Practise real-world Bitcoin security situations safely, with zero risk to your funds." },
      { property: "og:title", content: "Simulate — Key-Ching" },
      { property: "og:description", content: "Practise real-world Bitcoin security situations safely, with zero risk to your funds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulatePage,
});

function SimulatePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 2 · Simulate"
        title="Security simulations"
        description="Realistic practice scenarios. Make choices, see what happens, and learn — nothing here is real money."
      />
      <div className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success-soft p-4 text-sm">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
        <p>
          <strong>Safe practice only.</strong> Simulations use made-up sample words and addresses. Never type your real
          recovery phrase or private keys anywhere — including here.
        </p>
      </div>
      <div className="grid gap-4">
        {simulations.map((s) => {
          const locked = s.status === "locked";
          return (
            <article
              key={s.id}
              className="flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-card sm:flex-row sm:items-center sm:p-6"
            >
              <span
                className={
                  locked
                    ? "grid size-14 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground"
                    : "bg-orange-gradient grid size-14 shrink-0 place-items-center rounded-2xl text-primary-foreground"
                }
              >
                {locked ? <Lock className="size-6" /> : <Gamepad2 className="size-6" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">{s.title}</h2>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    {s.difficulty}
                  </span>
                  <StatusBadge status={s.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.scenario}</p>
                {s.score !== undefined && <p className="mt-1 text-sm font-semibold text-success">Score: {s.score}%</p>}
              </div>
              <Button
                variant={s.status === "available" ? "hero" : locked ? "secondary" : "outline"}
                disabled={locked}
                onClick={() => comingSoon(s.title)}
                className="sm:w-36"
              >
                {s.status === "passed" ? "Replay" : locked ? "Locked" : "Start"}
                {!locked && <ArrowRight />}
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
