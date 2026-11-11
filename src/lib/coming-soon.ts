import { toast } from "sonner";

export function comingSoon(what: string) {
  toast(`${what} is coming soon`, {
    description: "Interactive content arrives in the next stage of Key-Ching.",
  });
}
