import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiFetch, readApiJson } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Bookmark,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AuthResponse = {
  error?: string;
  message?: string;
  details?: { path: string; message: string }[];
  user?: { id: string; email: string; role: string };
};

const perks = [
  {
    icon: Shield,
    title: "Secure profile",
    desc: "Your details stay private and power verified matches.",
  },
  {
    icon: Bookmark,
    title: "Save & track",
    desc: "Bookmark schemes and mark ones you’ve applied for.",
  },
  {
    icon: Sparkles,
    title: "Rules-based picks",
    desc: "Only schemes that pass structured eligibility rules.",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { session, setSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (session) navigate("/for-you");
  }, [session, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp && password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const response = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await readApiJson<AuthResponse>(response);

      if (!response.ok) {
        if (data.error === "User already exists") {
          setIsSignUp(false);
          throw new Error(
            data.message || "An account with this email already exists. Sign in instead."
          );
        }
        const detail = data.details?.[0]?.message;
        throw new Error(detail || data.error || "Authentication failed");
      }
      if (!data.user) throw new Error("Authentication failed");

      setSession({ user: data.user });
      toast({
        title: isSignUp ? "Account Created!" : "Welcome back!",
        description: "Successfully logged in.",
      });
    } catch (err: unknown) {
      const message =
        err instanceof TypeError && /fetch|network/i.test(err.message)
          ? "Cannot reach the server. Start the app with npm run dev."
          : err instanceof Error
            ? err.message
            : "Authentication failed";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-void">
      {/* Ambient visuals */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 15% 20%, rgba(98, 95, 255, 0.28) 0%, transparent 55%), radial-gradient(45% 40% at 85% 15%, rgba(255, 125, 218, 0.16) 0%, transparent 50%), radial-gradient(50% 45% at 50% 100%, rgba(40, 98, 215, 0.14) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 15%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-aurora/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-plasma/15 blur-3xl" />

      <Header />

      <main className="relative z-10 flex flex-1 items-center px-4 pb-16 pt-28">
        <div className="container grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left copy */}
          <Reveal className="hidden lg:block">
            <p className="section-eyebrow mb-4">SchemeSetu account</p>
            <h1 className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-quartz lg:text-[48px]">
              {isSignUp ? (
                <>
                  Join and never miss
                  <span className="mt-1 block text-lilac">a benefit again</span>
                </>
              ) : (
                <>
                  Welcome back to
                  <span className="mt-1 block text-lilac">your matches</span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-md text-[16px] font-light leading-relaxed text-ash">
              {isSignUp
                ? "Create a free account to save schemes, track applications, and get verified-rule recommendations."
                : "Sign in to continue saving schemes and tracking applications across your dashboard."}
            </p>
            <ul className="mt-10 space-y-4">
              {perks.map((perk) => (
                <li
                  key={perk.title}
                  className="group flex gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-white/10 hover:bg-white/[0.03]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-deep-sea/80 transition-colors group-hover:border-aurora/40 group-hover:bg-aurora/15">
                    <perk.icon className="h-4 w-4 text-lilac" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-quartz">{perk.title}</p>
                    <p className="mt-0.5 text-[13px] font-light text-ash">{perk.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Auth panel */}
          <Reveal delayMs={80} className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-deep-sea/55 p-6 shadow-float backdrop-blur-xl md:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora/60 to-transparent" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-aurora/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-36 w-36 rounded-full bg-plasma/15 blur-3xl" />

              <div className="relative">
                {/* Mode toggle */}
                <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-void/60 p-1">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className={cn(
                      "rounded-full py-2 text-[13px] font-medium transition-all duration-300",
                      !isSignUp
                        ? "bg-quartz text-void shadow-sm"
                        : "text-ash hover:text-quartz"
                    )}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className={cn(
                      "rounded-full py-2 text-[13px] font-medium transition-all duration-300",
                      isSignUp
                        ? "bg-quartz text-void shadow-sm"
                        : "text-ash hover:text-quartz"
                    )}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="mb-6 text-center lg:text-left">
                  <p className="section-eyebrow mb-2">Account</p>
                  <h2 className="font-display text-[28px] font-medium tracking-tight text-quartz md:text-[32px]">
                    {isSignUp ? "Create an account" : "Welcome back"}
                  </h2>
                  <p className="mt-2 text-[14px] font-light text-ash">
                    {isSignUp
                      ? "Save schemes and track applications securely"
                      : "Sign in to your SchemeSetu dashboard"}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-ash">
                      Email
                    </Label>
                    <div className="group relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash transition-colors group-focus-within:text-lilac" />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="h-11 border-white/10 bg-void/70 pl-10 transition-all focus-visible:border-aurora/50 focus-visible:ring-aurora/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-ash">
                      Password
                    </Label>
                    <div className="group relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash transition-colors group-focus-within:text-lilac" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={isSignUp ? 8 : 1}
                        className="h-11 border-white/10 bg-void/70 pl-10 pr-11 transition-all focus-visible:border-aurora/50 focus-visible:ring-aurora/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ash transition-colors hover:bg-white/5 hover:text-quartz"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {isSignUp && (
                      <p className="text-[12px] text-ash">At least 8 characters</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="group mt-2 w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isSignUp ? "Create account" : "Sign In"}
                    {!isLoading && (
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-[13px] text-ash lg:text-left">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="font-medium text-lilac transition-colors hover:text-quartz"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>

                <p className="mt-4 text-center text-[12px] text-ash/80 lg:text-left">
                  Or{" "}
                  <Link to="/schemes" className="text-mist underline-offset-2 hover:underline">
                    browse schemes
                  </Link>{" "}
                  without an account
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
