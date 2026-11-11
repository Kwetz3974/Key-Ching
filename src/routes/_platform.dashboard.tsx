import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  ClipboardCheck,
  Gift,
  Flame,
  CheckCircle2,
  Clock,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/platform/ProgressRing";
import { StatusBadge } from "@/components/platform/StatusBadge";
import {
  sampleUser,
  modules,
  simulations,
  assessments,
  rewards,
  totals,
  formatSats,
} from "@/lib/sample-data";

export const Route = createFileRoute("/_platform/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Key-Ching" },
      { name: "description", content: "Your Key-Ching learning progress, simulations, assessments and rewards." },
      { property: "og:title", content: "Dashboard — Key-Ching" },
      { property: "og:description", content: "Track your Bitcoin self-custody learning progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const quickLinks = [
  { to: "/learn", label: "Learn", text: "Continue lessons", icon: BookOpen },
  { to: "/simulate", label: "Simulate", text: "Practise safely", icon: Gamepad2 },
  { to: "/test", label: "Test", text: "Check your knowledge", icon: ClipboardCheck },
  { to: "/rewards", label: "Earn", text: "View your sats", icon: Gift },
] as const;

function Dashboard() {
  const overall = Math.round((totals.lessonsDone / totals.lessonsTotal) * 100);
  const current = modules.find((m) => m.status === "in-progress") ?? modules[0];
  const completedModules = modules.filter((m) => m.status === "completed");
  const nextTest = assessments.find((a) => a.status === "available");

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="bg-hero relative overflow-hidden rounded-3xl p-6 text-navy-foreground sm:p-8">
        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Flame className="size-4" /> {sampleUser.streakDays}-day streak · {sampleUser.level}
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Welcome back, {sampleUser.firstName} 👋</h1>
            <p className="mt-3 text-navy-muted">
              You're making great progress. Finish <strong className="text-navy-foreground">{current.title}</strong> to
              unlock your next assessment.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6">
              <Link to="/learn">
                Continue learning <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-5 self-start rounded-2xl border border-navy-border bg-navy-foreground/5 p-5 backdrop-blur md:self-auto">
            <div className="relative">
              <ProgressRing value={overall} />
              <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold">
                {overall}%
              </span>
            </div>
            <div>
              <p className="text-sm text-navy-muted">Learning progress</p>
              <p className="mt-1 font-display text-xl font-bold">
                {totals.lessonsDone} / {totals.lessonsTotal}
              </p>
              <p className="text-sm text-navy-muted">lessons complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section aria-label="Quick navigation" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {quickLinks.map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift sm:p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <q.icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display font-bold">{q.label}</span>
              <span className="block truncate text-xs text-muted-foreground sm:text-sm">{q.text}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={CheckCircle2}
          label="Completed lessons"
          value={`${totals.lessonsDone}`}
          sub={`${completedModules.length} module${completedModules.length === 1 ? "" : "s"} finished`}
          progress={(totals.lessonsDone / totals.lessonsTotal) * 100}
        />
        <StatCard
          icon={Gamepad2}
          label="Simulations passed"
          value={`${totals.simsDone} / ${totals.simsTotal}`}
          sub="Scenarios practised safely"
          progress={(totals.simsDone / totals.simsTotal) * 100}
        />
        <StatCard
          icon={ClipboardCheck}
          label="Assessments passed"
          value={`${totals.testsDone} / ${totals.testsTotal}`}
          sub={nextTest ? `Next: ${nextTest.title}` : "All caught up"}
          progress={(totals.testsDone / totals.testsTotal) * 100}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Modules */}
        <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Learning modules</h2>
            <Link to="/learn" className="text-sm font-semibold text-accent-foreground hover:text-primary">
              View all
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {modules.slice(0, 4).map((m) => (
              <li key={m.id} className="flex items-center gap-4 rounded-2xl border bg-background p-4">
                <span
                  className={
                    m.status === "locked"
                      ? "grid size-11 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground"
                      : "grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-primary"
                  }
                >
                  {m.status === "locked" ? <Lock className="size-5" /> : <m.icon className="size-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold">{m.title}</p>
                    <StatusBadge status={m.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={(m.completed / m.lessons) * 100} className="h-1.5 bg-muted" />
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {m.completed}/{m.lessons}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6">
          {/* Rewards */}
          <section className="bg-navy-card relative overflow-hidden rounded-3xl p-6 text-navy-foreground shadow-lift">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Rewards summary</h2>
                <Gift className="size-5 text-primary" />
              </div>
              <p className="mt-5 text-sm text-navy-muted">Total earned</p>
              <p className="font-display text-4xl font-extrabold">
                {formatSats(rewards.earned)} <span className="text-lg text-primary">sats</span>
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-navy-foreground/5 p-3">
                  <p className="text-navy-muted">Pending</p>
                  <p className="font-display font-bold">{formatSats(rewards.pending)} sats</p>
                </div>
                <div className="rounded-xl bg-navy-foreground/5 p-3">
                  <p className="text-navy-muted">Still to earn</p>
                  <p className="font-display font-bold">{formatSats(rewards.available)} sats</p>
                </div>
              </div>
              <Button asChild variant="glass" className="mt-5 w-full">
                <Link to="/rewards">See reward history</Link>
              </Button>
            </div>
          </section>

          {/* Simulations */}
          <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Simulation progress</h2>
              <Link to="/simulate" className="text-sm font-semibold text-accent-foreground hover:text-primary">
                Open
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {simulations.slice(0, 4).map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{s.title}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {s.difficulty}
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Assessments */}
      <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Assessment status</h2>
          <Link to="/test" className="text-sm font-semibold text-accent-foreground hover:text-primary">
            Go to tests
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {assessments.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-background p-4">
              <StatusBadge status={a.status} />
              <p className="mt-3 font-semibold">{a.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {a.status === "passed" ? `Score: ${a.score}%` : `${a.questions} questions`}
              </p>
              <p className="mt-3 text-sm font-semibold text-accent-foreground">+{formatSats(a.reward)} sats</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  progress,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  sub: string;
  progress: number;
}) {
  return (
    <div className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <Icon className="size-5 text-primary" />
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
      <Progress value={progress} className="mt-4 h-1.5 bg-muted" />
      <p className="mt-3 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
