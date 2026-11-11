import { Link } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Key-Ching home">
      <span className="bg-orange-gradient grid size-9 place-items-center rounded-xl shadow-glow transition-transform group-hover:-rotate-6">
        <KeyRound className="size-5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          tone === "light" ? "text-navy-foreground" : "text-navy",
        )}
      >
        KEY<span className="text-primary">-</span>CHING
      </span>
    </Link>
  );
}
