import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemeCard from "@/components/SchemeCard";
import { UserProfile } from "@/components/UserProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Bookmark, CheckCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { Scheme } from "@/types/scheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ForYou = () => {
  const { t } = useLanguage();
  const { session, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recommended");
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  const [recommended, setRecommended] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);
  const [applied, setApplied] = useState<any[]>([]);
  
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    if (isAuthLoading) return;
    if (!session) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      // Fetch Profile
      const profileRes = await apiFetch("/api/profiles/me");
      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }

      // Fetch user_schemes
      const schemesRes = await apiFetch("/api/user-schemes");
      
      if (schemesRes.ok) {
        const schemesData = await schemesRes.json();
        
        const mapped = schemesData.map((s: any) => ({
          ...s.schemeData, // we saved the full scheme data snapshot in MongoDB!
          applicationLink: s.schemeData?.application_link || s.schemeData?.applicationLink,
          eligibilityScore: s.eligibilityScore,
          matchReason: s.matchReason,
          _status: s.status
        })).filter(s => s.id); // ensure valid schemes
        
        setRecommended(mapped.filter((s: any) => s._status === 'matched').sort((a: any, b: any) => b.eligibilityScore - a.eligibilityScore));
        setSaved(mapped.filter((s: any) => s._status === 'saved'));
        setApplied(mapped.filter((s: any) => s._status === 'applied'));
      }
    } catch (err: any) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [session, isAuthLoading]);

  const updateStatus = async (schemeId: string, newStatus: string) => {
    if (!session) {
      toast({ title: "Please log in", description: "You must be logged in to save schemes.", variant: "destructive" });
      return;
    }
    
    try {
      // Optimistic update
      const allSchemes = [...recommended, ...saved, ...applied];
      const targetScheme = allSchemes.find(s => s.id === schemeId);
      
      if (targetScheme) {
        const updatedScheme = { ...targetScheme, _status: newStatus };
        const newAll = allSchemes.filter(s => s.id !== schemeId);
        newAll.push(updatedScheme);
        
        setRecommended(newAll.filter((s: any) => s._status === 'matched').sort((a: any, b: any) => b.eligibilityScore - a.eligibilityScore));
        setSaved(newAll.filter((s: any) => s._status === 'saved'));
        setApplied(newAll.filter((s: any) => s._status === 'applied'));
      }

      const response = await apiFetch(`/api/user-schemes/${schemeId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
        
      if (!response.ok) {
        // Revert on failure
        fetchDashboardData();
        throw new Error("Failed to update status");
      }
      
      let message = "";
      if (newStatus === "saved") message = "Scheme saved to your profile.";
      if (newStatus === "applied") message = "Marked as applied.";
      
      toast({
        title: "Success",
        description: message,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Could not update status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-6xl">
          <div className="mb-10 flex flex-col md:flex-row gap-6 md:items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Your Dashboard</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {t("foryou.title")}
              </h1>
              {profile && (
                <p className="mt-2 text-muted-foreground">
                  Personalized for a {profile.age} year old {profile.gender} from {profile.state}.
                </p>
              )}
            </div>
            
            <Link to="/find-schemes">
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" /> Update Profile
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Tabs defaultValue="recommended" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
                <TabsTrigger value="recommended">
                  <Activity className="h-4 w-4 mr-2 hidden sm:inline-block" /> Recommended
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <Bookmark className="h-4 w-4 mr-2 hidden sm:inline-block" /> Saved
                </TabsTrigger>
                <TabsTrigger value="applied">
                  <CheckCircle className="h-4 w-4 mr-2 hidden sm:inline-block" /> Applied
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="mt-0">
                {recommended.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recommended.map((scheme) => (
                      <SchemeCard 
                        key={scheme.id} 
                        scheme={scheme} 
                        status={scheme._status}
                        onSave={() => updateStatus(scheme.id, 'saved')}
                        onApply={() => updateStatus(scheme.id, 'applied')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border rounded-2xl bg-muted/20">
                    <h3 className="text-xl font-medium mb-2">No recommended schemes yet</h3>
                    <p className="text-muted-foreground mb-6">Complete your profile to get personalized matches.</p>
                    <Link to="/find-schemes">
                      <Button variant="hero">Find Schemes</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-0">
                {saved.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {saved.map((scheme) => (
                      <SchemeCard 
                        key={scheme.id} 
                        scheme={scheme}
                        status={scheme._status}
                        onApply={() => updateStatus(scheme.id, 'applied')} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border rounded-2xl bg-muted/20">
                    <h3 className="text-xl font-medium mb-2">No saved schemes</h3>
                    <p className="text-muted-foreground">Schemes you save will appear here for easy access later.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applied" className="mt-0">
                {applied.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {applied.map((scheme) => (
                      <SchemeCard 
                        key={scheme.id} 
                        scheme={scheme} 
                        status={scheme._status}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border rounded-2xl bg-muted/20">
                    <h3 className="text-xl font-medium mb-2">No applications yet</h3>
                    <p className="text-muted-foreground">Keep track of schemes you've applied for here.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForYou;
