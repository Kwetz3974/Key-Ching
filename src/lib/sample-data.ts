// Sample data for the first visual stage. Replace with real user data later.
import {
  BookOpen,
  KeyRound,
  ShieldCheck,
  FileWarning,
  HardDrive,
  Users,
  type LucideIcon,
} from "lucide-react";

export const sampleUser = {
  firstName: "Amara",
  fullName: "Amara Wanjiru",
  email: "amara@example.com",
  joined: "September 2026",
  level: "Key Keeper · Level 2",
  streakDays: 5,
};

export type ModuleStatus = "completed" | "in-progress" | "not-started" | "locked";

export interface LearningModule {
  id: string;
  title: string;
  summary: string;
  lessons: number;
  completed: number;
  minutes: number;
  status: ModuleStatus;
  icon: LucideIcon;
}

export const modules: LearningModule[] = [
  {
    id: "basics",
    title: "Bitcoin Basics",
    summary: "What Bitcoin is, how it moves, and why ownership matters.",
    lessons: 4,
    completed: 4,
    minutes: 20,
    status: "completed",
    icon: BookOpen,
  },
  {
    id: "keys",
    title: "Understanding Your Keys",
    summary: "Public keys, private keys and why 'not your keys, not your coins'.",
    lessons: 3,
    completed: 2,
    minutes: 18,
    status: "in-progress",
    icon: KeyRound,
  },
  {
    id: "backups",
    title: "Recovery Phrases & Backups",
    summary: "How to write down, store and protect your backup the right way.",
    lessons: 4,
    completed: 0,
    minutes: 25,
    status: "not-started",
    icon: ShieldCheck,
  },
  {
    id: "scams",
    title: "Spotting Scams",
    summary: "Fake support agents, phishing links and too-good-to-be-true offers.",
    lessons: 3,
    completed: 0,
    minutes: 15,
    status: "not-started",
    icon: FileWarning,
  },
  {
    id: "hardware",
    title: "Hardware Wallets",
    summary: "Keeping your keys offline with a dedicated signing device.",
    lessons: 3,
    completed: 0,
    minutes: 20,
    status: "locked",
    icon: HardDrive,
  },
  {
    id: "inheritance",
    title: "Planning for Family",
    summary: "Make sure loved ones can access your Bitcoin if something happens.",
    lessons: 3,
    completed: 0,
    minutes: 18,
    status: "locked",
    icon: Users,
  },
];

export interface Simulation {
  id: string;
  title: string;
  scenario: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "passed" | "available" | "locked";
  score?: number;
}

export const simulations: Simulation[] = [
  {
    id: "phishing",
    title: "The Suspicious Email",
    scenario: "An 'exchange' asks you to verify your wallet. Spot the warning signs.",
    difficulty: "Beginner",
    status: "passed",
    score: 100,
  },
  {
    id: "support",
    title: "Fake Support Agent",
    scenario: "Someone on social media offers help and asks for your recovery words.",
    difficulty: "Beginner",
    status: "passed",
    score: 80,
  },
  {
    id: "backup",
    title: "Practice Backup Drill",
    scenario: "Write and verify a practice backup using sample words — never real ones.",
    difficulty: "Intermediate",
    status: "available",
  },
  {
    id: "address",
    title: "Check the Address",
    scenario: "Double-check a receiving address before sending a practice payment.",
    difficulty: "Intermediate",
    status: "available",
  },
  {
    id: "lost-phone",
    title: "Lost Phone Recovery",
    scenario: "Your phone is gone. Walk through restoring access safely.",
    difficulty: "Advanced",
    status: "locked",
  },
];

export interface Assessment {
  id: string;
  title: string;
  questions: number;
  status: "passed" | "available" | "locked";
  score?: number;
  reward: number;
}

export const assessments: Assessment[] = [
  { id: "a1", title: "Bitcoin Basics Check", questions: 10, status: "passed", score: 90, reward: 1000 },
  { id: "a2", title: "Keys & Ownership", questions: 12, status: "available", reward: 1500 },
  { id: "a3", title: "Backup Mastery", questions: 12, status: "locked", reward: 2000 },
  { id: "a4", title: "Scam Defence", questions: 10, status: "locked", reward: 2000 },
];

export interface RewardEntry {
  id: string;
  label: string;
  date: string;
  sats: number;
  status: "paid" | "pending";
}

export const rewards = {
  earned: 2100,
  pending: 500,
  available: 6500,
  history: [
    { id: "r1", label: "Passed: Bitcoin Basics Check", date: "Nov 4, 2026", sats: 1000, status: "paid" },
    { id: "r2", label: "Simulation: The Suspicious Email", date: "Nov 6, 2026", sats: 600, status: "paid" },
    { id: "r3", label: "5-day learning streak", date: "Nov 9, 2026", sats: 500, status: "paid" },
    { id: "r4", label: "Simulation: Fake Support Agent", date: "Nov 10, 2026", sats: 500, status: "pending" },
  ] as RewardEntry[],
};

export const totals = {
  lessonsTotal: modules.reduce((n, m) => n + m.lessons, 0),
  lessonsDone: modules.reduce((n, m) => n + m.completed, 0),
  simsTotal: simulations.length,
  simsDone: simulations.filter((s) => s.status === "passed").length,
  testsTotal: assessments.length,
  testsDone: assessments.filter((a) => a.status === "passed").length,
};

export function formatSats(n: number) {
  return n.toLocaleString("en-US");
}
