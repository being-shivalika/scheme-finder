import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProfileForm from "@/components/UserProfileForm";
import SchemeCard from "@/components/SchemeCard";
import { UserProfile, Scheme } from "@/types/scheme";
import { governmentSchemes } from "@/data/schemes";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

const FindSchemes = () => {
  const { session } = useAuth();
  const [matchedSchemes, setMatchedSchemes] = useState<Scheme[] | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProfileSubmit = async (profile: UserProfile) => {
    if (!session) {
      toast({ title: "Login Required", description: "Please create an account or sign in to find and save matching schemes." });
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const token = session.token;

      // Upsert user profile first
      const profileRes = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      
      if (!profileRes.ok) throw new Error("Failed to save profile");

      // Score schemes locally
      let matchedIds: any[] = [];
      const scoreScheme = (scheme: Scheme, p: UserProfile) => {
        let score = 0;
        if (p.age) score += 10;
        if (scheme.eligibility.some(e => e.toLowerCase().includes(p.state.toLowerCase()))) score += 20;
        if (scheme.eligibility.some(e => e.toLowerCase().includes(p.gender.toLowerCase()))) score += 20;
        return score;
      };

      governmentSchemes.forEach(scheme => {
        const score = scoreScheme(scheme, profile);
        if (score > 10) { // arbitrary threshold for demo
          matchedIds.push({
            schemeId: scheme.id,
            eligibilityScore: score,
            matchReason: 'Matched based on your profile details.',
            schemeData: scheme
          });
        }
      });
      
      // Save matched schemes to MongoDB
      if (matchedIds.length > 0) {
        const schemesRes = await fetch('/api/user-schemes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ schemes: matchedIds })
        });
        
        if (!schemesRes.ok) throw new Error("Failed to save schemes");
      }

      toast({
        title: "Profile Saved",
        description: `We found ${matchedIds.length} schemes you might be eligible for.`,
      });
      
      navigate("/for-you");
      
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          {!matchedSchemes ? (
            <>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Matching</span>
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
                  Find Your Eligible Schemes
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Fill in your details below. We'll find schemes you're eligible for.
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
                <UserProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
              </div>
            </>
          ) : (
            <div className="text-center">
               <Loader2 className="animate-spin h-8 w-8 mx-auto" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindSchemes;
