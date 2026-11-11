import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  ClipboardCheck,
  Gift,
  ShieldAlert,
  KeyRound,
  Lock,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import heroImg from "@/assets/hero-key-shield.jpg";
import whyImg from "@/assets/why-self-custody.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Key-Ching — Learn. Simulate. Test. Earn." },
      {
        name: "description",
        content:
          "Learn how to protect your Bitcoin keys with simple lessons, realistic security simulations and quizzes — and earn sats for what you learn.",
      },
      { property: "og:title", content: "Key-Ching — Learn. Simulate. Test. Earn." },
      {
        property: "og:description",
        content:
          "Interactive Bitcoin self-custody education for beginners and existing users. Earn sats as you learn.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: BookOpen,
    title: "Learn",
    text: "Short, plain-language lessons on keys, backups and staying safe.",
  },
  {
    icon: Gamepad2,
    title: "Simulate",
    text: "Practise real-life situations like scam messages — with zero risk.",
  },
  {
    icon: ClipboardCheck,
    title: "Test",
    text: "Quick quizzes check what you know and show where to improve.",
  },
  {
    icon: Gift,
    title: "Earn",
    text: "Prove your understanding and qualify for Bitcoin rewards in sats.",
  },
];

const reasons = [
  {
    icon: ShieldAlert,
    title: "Scams target beginners",
    text: "Most Bitcoin losses come from tricks, not hacks. Knowing the signs keeps you safe.",
  },
  {
    icon: KeyRound,
    title: "Your keys, your coins",
    text: "Whoever holds the keys controls the Bitcoin. Learn how to hold them yourself.",
  },
  {
    icon: Lock,
    title: "Mistakes are permanent",
    text: "There's no bank to call. A lost backup can mean lost savings — forever.",
  },
  {
    icon: HeartHandshake,
    title: "Protect your family",
    text: "Plan ahead so the people you love can access what you've saved.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden text-navy-foreground">
        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-60" />
        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Button asChild variant="ghost" className="text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild variant="hero" className="hidden sm:inline-flex">
              <Link to="/register">Get Started</Link>
            </Button>
          </nav>
        </header>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:pb-28 lg:pt-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-border bg-navy-foreground/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Learn. Simulate. Test. Earn.
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Your Bitcoin is only as safe as <span className="text-orange-gradient">your keys.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-muted">
              Key-Ching teaches you to protect your Bitcoin step by step — with friendly lessons,
              realistic practice scenarios and quick quizzes. Show what you've learned and earn sats
              along the way.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link to="/register">
                  Get Started — it's free <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-muted">
              {["No wallet needed to start", "Never asks for your keys", "Beginner friendly"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
            <img
              src={heroImg}
              alt="A glowing Bitcoin key protected inside a shield, surrounded by a checklist, padlock and graduation cap"
              width={1280}
              height={1088}
              className="animate-float relative w-full rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">How it works</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Four simple steps to confident self-custody</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No jargon, no pressure. Move at your own pace and build real skills you can use every day.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative rounded-3xl border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-muted">
                0{i + 1}
              </span>
              <span className="relative grid size-12 place-items-center rounded-2xl bg-primary-soft text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-6" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold">{s.title}</h3>
              <p className="relative mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why it matters */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div className="order-2 lg:order-1">
            <img
              src={whyImg}
              alt="A person learning about Bitcoin security on a laptop with a padlock, notebook and vault"
              width={1152}
              height={1024}
              loading="lazy"
              className="w-full rounded-3xl border shadow-lift"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Why it matters</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Holding Bitcoin yourself is powerful. It's also your responsibility.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Self-custody means no one can freeze or take your Bitcoin. But it also means you're the
              one keeping it safe. A little knowledge goes a long way.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-2xl border bg-background p-5">
                  <r.icon className="size-5 text-primary" />
                  <h3 className="mt-3 font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="bg-hero relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-navy-foreground sm:px-12 sm:py-20">
          <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Start protecting your keys today</h2>
            <p className="mt-4 text-lg text-navy-muted">
              Join learners building safer Bitcoin habits — and earn sats as you go.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link to="/register">
                  Get Started <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <Logo tone="dark" />
          <p>Key-Ching will never ask for your recovery phrase or private keys.</p>
          <p>© 2026 Key-Ching</p>
        </div>
      </footer>
    </div>
  );
}
