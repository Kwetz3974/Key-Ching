import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Key-Ching" },
      { name: "description", content: "Log in to continue your Bitcoin self-custody lessons on Key-Ching." },
      { property: "og:title", content: "Log in — Key-Ching" },
      { property: "og:description", content: "Continue learning how to protect your Bitcoin keys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={
        <>
          New to Key-Ching?{" "}
          <Link to="/register" className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline">
            Create an account
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required className="h-12 rounded-xl bg-card" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <span className="text-xs font-medium text-muted-foreground">Forgot password?</span>
          </div>
          <Input id="password" type="password" placeholder="Your password" required className="h-12 rounded-xl bg-card" />
        </div>
        <Button type="submit" variant="hero" size="xl" className="w-full">
          Log in <ArrowRight />
        </Button>
      </form>
    </AuthLayout>
  );
}
