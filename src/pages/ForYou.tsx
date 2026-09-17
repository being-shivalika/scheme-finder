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

      const response = await apiFetch(`/api/user-schemes/${encodeURIComponent(schemeId)}`, {
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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 10% 0%, rgba(98, 95, 255, 0.18) 0%, transparent 55%), radial-gradient(40% 35% at 90% 10%, rgba(255, 159, 252, 0.1) 0%, transparent 50%)",
        }}
      />
      <Header />

      <main className="relative z-10 flex-1 px-0 pb-12 pt-24">
        <div className="container max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 backdrop-blur">
                <Activity className="h-3.5 w-3.5 text-lilac" />
                <span className="text-[12px] font-medium text-mist">Your Dashboard</span>
              </div>
              <h1 className="font-display text-heading-sm text-quartz md:text-heading">
                {t("foryou.title")}
              </h1>
              {profile && (
                <p className="mt-2 text-[15px] font-light text-ash">
                  Personalized for a {profile.age}-year-old {profile.gender} from {profile.state}.
                </p>
              )}
            </div>

            <Link to="/find-schemes">
              <Button variant="outline" className="gap-2 border-white/15">
                <Search className="h-4 w-4" /> Update Profile
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-sapphire border-t-lilac" />
            </div>
          ) : (
            <Tabs defaultValue="recommended" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-8 grid w-full max-w-md grid-cols-3 rounded-full border border-white/10 bg-void/60 p-1">
                <TabsTrigger value="recommended" className="rounded-full data-[state=active]:bg-cobalt">
                  <Activity className="mr-2 hidden h-4 w-4 sm:inline-block" /> Recommended
                  {recommended.length > 0 && (
                    <span className="ml-1.5 text-[11px] text-lilac">{recommended.length}</span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="saved" className="rounded-full data-[state=active]:bg-cobalt">
                  <Bookmark className="mr-2 hidden h-4 w-4 sm:inline-block" /> Saved
                  {saved.length > 0 && (
                    <span className="ml-1.5 text-[11px] text-lilac">{saved.length}</span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="applied" className="rounded-full data-[state=active]:bg-cobalt">
                  <CheckCircle className="mr-2 hidden h-4 w-4 sm:inline-block" /> Applied
                  {applied.length > 0 && (
                    <span className="ml-1.5 text-[11px] text-lilac">{applied.length}</span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="mt-0">
                {recommended.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {recommended.map((scheme) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        showMatchScore
                        status={scheme._status}
                        onSave={() => updateStatus(scheme.id, "saved")}
                        onApply={() => updateStatus(scheme.id, "applied")}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-deep-sea/40 py-20 text-center backdrop-blur">
                    <h3 className="mb-2 font-display text-xl text-quartz">No recommended schemes yet</h3>
                    <p className="mb-6 text-ash">Complete your profile to get personalized matches.</p>
                    <Link to="/find-schemes">
                      <Button variant="default">Find Schemes</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-0">
                {saved.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {saved.map((scheme) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        showMatchScore
                        status={scheme._status}
                        onApply={() => updateStatus(scheme.id, "applied")}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-deep-sea/40 py-20 text-center">
                    <h3 className="mb-2 font-display text-xl text-quartz">No saved schemes</h3>
                    <p className="text-ash">Schemes you save will appear here.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applied" className="mt-0">
                {applied.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {applied.map((scheme) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        showMatchScore
                        status={scheme._status}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-deep-sea/40 py-20 text-center">
                    <h3 className="mb-2 font-display text-xl text-quartz">No applications yet</h3>
                    <p className="text-ash">Track schemes you&apos;ve applied for here.</p>
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
