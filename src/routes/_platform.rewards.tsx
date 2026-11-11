import { createFileRoute } from "@tanstack/react-router";
import { Gift, Hourglass, Target, Info } from "lucide-react";
import { PageHeader } from "@/components/platform/PageHeader";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { rewards, formatSats } from "@/lib/sample-data";

export const Route = createFileRoute("/_platform/rewards")({
  head: () => ({
    meta: [
      { title: "My Rewards — Key-Ching" },
      { name: "description", content: "See the Bitcoin rewards (sats) you've earned by learning and passing assessments." },
      { property: "og:title", content: "My Rewards — Key-Ching" },
      { property: "og:description", content: "See the Bitcoin rewards (sats) you've earned by learning and passing assessments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const cards = [
    { label: "Total earned", value: rewards.earned, icon: Gift, featured: true },
    { label: "Pending", value: rewards.pending, icon: Hourglass },
    { label: "Still to earn", value: rewards.available, icon: Target },
  ];
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Step 4 · Earn"
        title="My Rewards"
        description="Sats you've earned for showing what you know. Sample figures shown for now."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className={
              c.featured
                ? "bg-navy-card rounded-3xl p-6 text-navy-foreground shadow-lift"
                : "rounded-3xl border bg-card p-6 shadow-card"
            }
          >
            <c.icon className="size-5 text-primary" />
            <p className={c.featured ? "mt-4 text-sm text-navy-muted" : "mt-4 text-sm text-muted-foreground"}>{c.label}</p>
            <p className="font-display text-3xl font-extrabold">
              {formatSats(c.value)} <span className="text-base text-primary">sats</span>
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
        <h2 className="text-xl font-bold">Reward history</h2>
        <ul className="mt-4 divide-y">
          {rewards.history.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{r.label}</p>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={r.status} />
                <span className="font-display font-bold">+{formatSats(r.sats)} sats</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-start gap-3 rounded-2xl border bg-info-soft p-4 text-sm">
        <Info className="mt-0.5 size-5 shrink-0 text-info" />
        <p>
          Reward payouts aren't switched on yet. When they are, you'll receive sats to a Lightning address you choose —
          we'll never need your private keys.
        </p>
      </div>
    </div>
  );
}
