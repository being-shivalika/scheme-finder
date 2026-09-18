import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiFetch, readApiJson } from "@/lib/api";
import { Loader2 } from "lucide-react";

type AuthResponse = {
  error?: string;
  message?: string;
  details?: { path: string; message: string }[];
  user?: { id: string; email: string; role: string };
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex min-h-screen flex-col bg-aurora">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-28">
        <Card className="w-full max-w-md border-obsidian shadow-float">
          <CardHeader className="pb-2 text-center">
            <p className="section-eyebrow mb-2">Account</p>
            <CardTitle className="text-heading-sm">
              {isSignUp ? "Create an account" : "Welcome back"}
            </CardTitle>
            <CardDescription className="text-[15px]">
              {isSignUp
                ? "Save schemes and track applications securely"
                : "Sign in to your SchemeSetu dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-ash">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-ash">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={isSignUp ? 8 : 1}
                />
                {isSignUp && (
                  <p className="text-[12px] text-ash">At least 8 characters</p>
                )}
              </div>
              <Button type="submit" variant="default" className="mt-6 w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-ash">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 font-medium text-signal hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
