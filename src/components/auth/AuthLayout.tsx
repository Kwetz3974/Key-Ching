import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import heroImg from "@/assets/hero-key-shield.jpg";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="bg-hero relative hidden overflow-hidden p-10 text-navy-foreground lg:flex lg:flex-col">
        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-60" />
        <Logo className="relative" />
        <div className="relative my-auto">
          <img
            src={heroImg}
            alt=""
            width={1280}
            height={1088}
            className="animate-float mx-auto w-full max-w-md"
          />
          <h2 className="mt-8 max-w-md text-3xl font-bold">Learn. Simulate. Test. Earn.</h2>
          <p className="mt-3 max-w-md text-navy-muted">
            Build the skills to keep your Bitcoin safe — one simple step at a time.
          </p>
        </div>
        <p className="relative flex items-center gap-2 text-sm text-navy-muted">
          <ShieldCheck className="size-4 text-primary" />
          We will never ask for your recovery phrase or private keys.
        </p>
      </aside>

      <main className="flex flex-col px-5 py-8 sm:px-10">
        <div className="lg:hidden">
          <div className="bg-hero -mx-5 -mt-8 mb-8 px-5 py-5 sm:-mx-10 sm:px-10">
            <Logo />
          </div>
        </div>
        <div className="mx-auto my-auto w-full max-w-md">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </main>
    </div>
  );
}
