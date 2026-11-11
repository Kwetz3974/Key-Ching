import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, LogOut, Flame } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/lib/nav";
import { sampleUser, rewards, formatSats } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_platform")({
  component: PlatformLayout,
});

function NavList({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {mainNav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className: "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground shadow-glow",
          }}
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <Logo />
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto space-y-3">
        <div className="bg-navy-card rounded-2xl border border-sidebar-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-muted">Sats earned</p>
          <p className="mt-1 font-display text-2xl font-bold text-navy-foreground">
            {formatSats(rewards.earned)} <span className="text-sm text-primary">sats</span>
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-navy-muted">
            <Flame className="size-3.5 text-primary" /> {sampleUser.streakDays}-day learning streak
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="size-4" /> Log out
        </Link>
      </div>
    </div>
  );
}

function PlatformLayout() {
  const [open, setOpen] = useState(false);
  const initials = sampleUser.fullName
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 hidden h-screen bg-sidebar lg:block">
        <SidebarBody />
      </aside>

      <div className="flex min-w-0 flex-col">
        {/* Mobile / tablet top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-navy px-4 py-3 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="grid size-10 place-items-center rounded-xl text-navy-foreground hover:bg-navy-elevated"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarBody onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <Logo />
          <Link
            to="/profile"
            aria-label="Profile"
            className="bg-orange-gradient grid size-10 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground"
          >
            {initials}
          </Link>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10">
          <Outlet />
        </main>

        {/* Mobile bottom tab bar */}
        <nav
          aria-label="Quick"
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-card/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        >
          {mainNav.slice(0, 5).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {({ isActive }) => (
                <>
                  <span className={cn("grid h-7 w-12 place-items-center rounded-full transition-colors", isActive && "bg-primary-soft")}>
                    <item.icon className="size-5" />
                  </span>
                  {item.label.replace("My ", "")}
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
