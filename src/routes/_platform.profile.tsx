import { createFileRoute } from "@tanstack/react-router";
import { Mail, CalendarDays, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/platform/PageHeader";
import { sampleUser, totals, rewards, formatSats } from "@/lib/sample-data";
import { comingSoon } from "@/lib/coming-soon";

export const Route = createFileRoute("/_platform/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Key-Ching" },
      { name: "description", content: "Manage your Key-Ching profile and see your learning achievements." },
      { property: "og:title", content: "Profile — Key-Ching" },
      { property: "og:description", content: "Manage your Key-Ching profile and see your learning achievements." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const initials = sampleUser.fullName
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Account" title="Profile" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="rounded-3xl border bg-card p-6 text-center shadow-card">
          <div className="bg-orange-gradient mx-auto grid size-24 place-items-center rounded-full font-display text-3xl font-bold text-primary-foreground shadow-glow">
            {initials}
          </div>
          <h2 className="mt-4 text-2xl font-bold">{sampleUser.fullName}</h2>
          <p className="text-sm font-semibold text-accent-foreground">{sampleUser.level}</p>
          <ul className="mt-6 space-y-3 text-left text-sm text-muted-foreground">
            <li className="flex items-center gap-3"><Mail className="size-4 text-primary" /> {sampleUser.email}</li>
            <li className="flex items-center gap-3"><CalendarDays className="size-4 text-primary" /> Joined {sampleUser.joined}</li>
            <li className="flex items-center gap-3"><Award className="size-4 text-primary" /> {totals.lessonsDone} lessons · {totals.testsDone} assessment passed</li>
            <li className="flex items-center gap-3"><ShieldCheck className="size-4 text-primary" /> {formatSats(rewards.earned)} sats earned</li>
          </ul>
        </section>

        <section className="rounded-3xl border bg-card p-6 shadow-card">
          <h2 className="text-xl font-bold">Personal details</h2>
          <form
            className="mt-5 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              comingSoon("Saving profile changes");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue={sampleUser.fullName} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={sampleUser.email} className="h-12 rounded-xl" />
            </div>
            <Button type="submit" variant="navy" size="lg">Save changes</Button>
          </form>
        </section>
      </div>
    </div>
  );
}
