import { LayoutDashboard, BookOpen, Gamepad2, ClipboardCheck, Gift, UserRound } from "lucide-react";

export const mainNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/simulate", label: "Simulate", icon: Gamepad2 },
  { to: "/test", label: "Test", icon: ClipboardCheck },
  { to: "/rewards", label: "My Rewards", icon: Gift },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;
