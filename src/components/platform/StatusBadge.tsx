import { CheckCircle2, Lock, PlayCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "completed" | "passed" | "in-progress" | "available" | "not-started" | "locked" | "paid" | "pending";

const map: Record<Status, { label: string; className: string; Icon: typeof Lock }> = {
  completed: { label: "Completed", className: "bg-success-soft text-success", Icon: CheckCircle2 },
  passed: { label: "Passed", className: "bg-success-soft text-success", Icon: CheckCircle2 },
  paid: { label: "Paid", className: "bg-success-soft text-success", Icon: CheckCircle2 },
  "in-progress": { label: "In progress", className: "bg-primary-soft text-accent-foreground", Icon: PlayCircle },
  available: { label: "Available", className: "bg-info-soft text-info", Icon: PlayCircle },
  pending: { label: "Pending", className: "bg-primary-soft text-accent-foreground", Icon: Circle },
  "not-started": { label: "Not started", className: "bg-muted text-muted-foreground", Icon: Circle },
  locked: { label: "Locked", className: "bg-muted text-muted-foreground", Icon: Lock },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const { label, className: c, Icon } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", c, className)}>
      <Icon className="size-3.5" /> {label}
    </span>
  );
}
