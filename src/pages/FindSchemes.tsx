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
import { AlertCircle, Loader2, ListChecks } from "lucide-react";

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
      const profileRes = await apiFetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify(profile),
      });
      if (!profileRes.ok) throw new Error("Failed to save profile");

      const matchRes = await apiFetch('/api/schemes/match', {
        method: 'POST',
        body: JSON.stringify(profile),
      });
      if (!matchRes.ok) throw new Error("Failed to match schemes");
      const matchData = await matchRes.json();
      const eligibleCount = matchData.counts?.eligible ??
        matchData.schemes?.filter((m: { matchStatus: string }) => m.matchStatus === 'eligible').length ?? 0;

      // Server recomputes and persists only eligible schemes
      const schemesRes = await apiFetch('/api/user-schemes', { method: 'POST', body: '{}' });
      if (!schemesRes.ok) throw new Error("Failed to save schemes");

      toast({
        title: "Profile Saved",
        description: eligibleCount
          ? `We found ${eligibleCount} scheme(s) you appear eligible for.`
          : "No verified eligible matches yet. Browse schemes or update your profile details.",
      });

      navigate("/for-you");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to find matching schemes.";
      console.error("Error matching schemes:", err);
      setError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <ListChecks className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Rules-Based Eligibility Matching</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
              Find Your Eligible Schemes
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fill in your details. We evaluate structured eligibility rules and only recommend verified matches.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
            {schemesLoading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading latest schemes data...</p>
              </div>
            ) : (
              <UserProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindSchemes;
