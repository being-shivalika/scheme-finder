import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProfileForm from "@/components/UserProfileForm";
import SchemeCard from "@/components/SchemeCard";
import { UserProfile, Scheme } from "@/types/scheme";
import { governmentSchemes } from "@/data/schemes";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FindSchemes = () => {
  const [matchedSchemes, setMatchedSchemes] = useState<Scheme[] | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke("match-schemes", {
        body: { userProfile: profile, schemes: governmentSchemes },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Map the AI results to our scheme data
      const matchedIds = data.matchedSchemes || [];
      const schemesWithScores: Scheme[] = matchedIds
        .map((match: any) => {
          const scheme = governmentSchemes.find(s => s.id === match.schemeId);
          if (scheme) {
            return {
              ...scheme,
              eligibilityScore: match.eligibilityScore,
              matchReason: match.matchReason,
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a: Scheme, b: Scheme) => (b.eligibilityScore || 0) - (a.eligibilityScore || 0));

      setMatchedSchemes(schemesWithScores);
      setSummary(data.summary || "");

      toast({
        title: "Schemes Found!",
        description: `Found ${schemesWithScores.length} schemes matching your profile.`,
      });
    } catch (err: any) {
      console.error("Error matching schemes:", err);
      setError(err.message || "Failed to find matching schemes. Please try again.");
      toast({
        title: "Error",
        description: err.message || "Failed to find matching schemes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMatchedSchemes(null);
    setSummary("");
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          {!matchedSchemes ? (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Matching</span>
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Find Your Eligible Schemes
                </h1>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                  Enter your details below and our AI will analyze your profile to find government schemes you may be eligible for.
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="max-w-2xl mx-auto mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <UserProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={handleReset} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Check Again
                </Button>
              </div>

              <div className="max-w-3xl mx-auto mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground text-center">
                  Your Matching Schemes
                </h1>
                
                {summary && (
                  <div className="mt-6 rounded-2xl bg-hero-gradient p-6 text-primary-foreground">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">AI Summary</p>
                        <p className="mt-1 text-primary-foreground/90">{summary}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {matchedSchemes.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedSchemes.map((scheme) => (
                    <SchemeCard key={scheme.id} scheme={scheme} showMatchScore />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    No matching schemes found
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Based on your profile, we couldn't find strong matches. Try browsing all schemes manually or adjust your profile details.
                  </p>
                  <Button onClick={handleReset} className="mt-6">
                    Try Different Details
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindSchemes;
