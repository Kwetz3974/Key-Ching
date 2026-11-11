import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — Key-Ching" },
      {
        name: "description",
        content: "Sign up for Key-Ching and start learning how to protect your Bitcoin keys — free.",
      },
      { property: "og:title", content: "Create your account — Key-Ching" },
      { property: "og:description", content: "Start your Bitcoin self-custody journey. Learn, simulate, test and earn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free to join. Start your first lesson in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/dashboard" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="e.g. Amara Wanjiru" required className="h-12 rounded-xl bg-card" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required className="h-12 rounded-xl bg-card" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            minLength={8}
            required
            className="h-12 rounded-xl bg-card"
          />
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {["Bite-sized lessons for complete beginners", "Earn sats when you pass assessments"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="size-4 text-success" /> {t}
            </li>
          ))}
        </ul>
        <Button type="submit" variant="hero" size="xl" className="w-full">
          Create account <ArrowRight />
        </Button>
      </form>
    </AuthLayout>
  );
}
