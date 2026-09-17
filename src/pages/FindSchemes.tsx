import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProfileForm from "@/components/UserProfileForm";
import { UserProfile } from "@/types/scheme";
import { useSchemes } from "@/hooks/useSchemes";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";

const FindSchemes = () => {
  const { session } = useAuth();
  const { loading: schemesLoading } = useSchemes();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProfileSubmit = async (profile: UserProfile) => {
    if (!session) {
      toast({
        title: "Login Required",
        description: "Please create an account or sign in to find and save matching schemes.",
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const profileRes = await apiFetch("/api/profiles", {
        method: "POST",
        body: JSON.stringify(profile),
      });
      if (!profileRes.ok) throw new Error("Failed to save profile");

      const matchRes = await apiFetch("/api/schemes/match", {
        method: "POST",
        body: JSON.stringify(profile),
      });
      if (!matchRes.ok) throw new Error("Failed to match schemes");
      const matchData = await matchRes.json();
      const eligibleCount =
        matchData.counts?.eligible ??
        matchData.schemes?.filter((m: { matchStatus: string }) => m.matchStatus === "eligible")
          .length ??
        0;

      const schemesRes = await apiFetch("/api/user-schemes", { method: "POST", body: "{}" });
      if (!schemesRes.ok) throw new Error("Failed to save schemes");

      toast({
        title: "Profile Saved",
        description: eligibleCount
          ? `We found ${eligibleCount} scheme(s) you appear eligible for.`
          : "No verified eligible matches yet. Browse schemes or update your profile.",
      });
      navigate("/for-you");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to find matching schemes.";
      setError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-void">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 20% 0%, rgba(98, 95, 255, 0.28) 0%, transparent 55%), radial-gradient(45% 40% at 90% 20%, rgba(255, 159, 252, 0.18) 0%, transparent 50%), radial-gradient(40% 35% at 50% 100%, rgba(40, 98, 215, 0.15) 0%, transparent 55%)",
        }}
      />

      <Header />

      <main className="relative z-10 flex-1 pb-16 pt-24">
        <div className="container max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-lilac" />
              <span className="text-[12px] font-medium text-mist">Rules-based eligibility</span>
            </div>
            <h1 className="font-display text-heading-sm text-quartz md:text-heading">
              Find your eligible schemes
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[15px] font-light text-ash">
              A few details — we match verified rules and recommend only what you appear eligible for.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 border-destructive/40 bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Glass panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-deep-sea/50 p-6 shadow-float backdrop-blur-xl md:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora/60 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-aurora/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-40 w-40 rounded-full bg-plasma/10 blur-3xl" />

            <div className="relative">
              {schemesLoading ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-lilac" />
                  <p className="text-ash">Loading schemes catalog…</p>
                </div>
              ) : (
                <UserProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindSchemes;
