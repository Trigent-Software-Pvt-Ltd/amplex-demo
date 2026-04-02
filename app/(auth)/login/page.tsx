"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("walmart@amplex.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side — branding panel */}
      <div className="hidden lg:flex w-1/2 bg-[#C41230] relative flex-col items-center justify-center p-12">
        <div className="text-center">
          <img
            src="https://amplex.com/wp-content/uploads/2019/10/logo-wyt-300x56.png"
            alt="Amplex Corporation"
            className="h-16 w-auto"
          />
          <p className="text-xl text-white/80 mt-2">
            Customer Intelligence Portal
          </p>
          <div className="flex flex-row gap-3 mt-8 justify-center">
            <span className="text-sm text-white/70 bg-white/10 rounded-full px-4 py-2 border border-white/10">
              Live iSeries Data
            </span>
            <span className="text-sm text-white/70 bg-white/10 rounded-full px-4 py-2 border border-white/10">
              AI-Powered
            </span>
            <span className="text-sm text-white/70 bg-white/10 rounded-full px-4 py-2 border border-white/10">
              World-Class 3PL
            </span>
          </div>
        </div>

        {/* Trigent logo at bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <img
            src="https://trigent.com/wp-content/uploads/trigent-_yellow-white-ho.svg"
            alt="Trigent"
            className="h-6 w-auto opacity-60"
          />
        </div>
      </div>

      {/* Right side — login form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm mx-auto flex flex-col items-start justify-center flex-1">
          {/* Branding */}
          <img
            src="https://amplex.com/wp-content/uploads/2020/12/amplex-logo.png"
            alt="Amplex Corporation"
            className="h-10 w-auto mb-1"
          />
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to your account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="walmart@amplex.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C41230] hover:bg-[#a50f28] text-white h-11"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 bg-muted rounded-lg p-4 w-full">
            <p className="font-bold text-sm">Demo Credentials</p>
            <p className="font-code text-xs mt-1">Email: walmart@amplex.com</p>
            <p className="font-code text-xs">Password: demo123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Powered by Trigent ArkOS</span>
          </div>
          <div className="bg-[#0a0a0f] rounded-lg px-3 py-2 inline-flex items-center gap-2">
            <img
              src="https://www.arkos.studio/TrigentArkOS-fullcolor-white.svg"
              alt="ArkOS"
              className="h-5 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
