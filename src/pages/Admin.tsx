import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { Activity, Users, FileText, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Admin = () => {
  const { session, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChecks: 0,
    totalSaved: 0,
    totalApplied: 0,
  });
  const [topSchemes, setTopSchemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;
    
    if (!session) {
      navigate("/login");
      return;
    }

    if (session.user.role !== 'admin') {
      toast({ title: "Access Denied", description: "You don't have permission to view the admin dashboard.", variant: "destructive" });
      navigate("/");
      return;
    }

    const fetchAdminData = async () => {
      try {
        const response = await apiFetch('/api/admin/stats');
        
        if (!response.ok) throw new Error("Failed to fetch admin stats");
        
        const data = await response.json();
        
        setStats({
          totalUsers: data.totalUsers,
          totalChecks: data.totalChecks,
          totalSaved: data.totalSaved,
          totalApplied: data.totalApplied,
        });
        
        setTopSchemes(data.topSchemes);
      } catch (err: any) {
        console.error("Failed to load admin data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [session, isAuthLoading, navigate, toast]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <Activity className="h-8 w-8 text-primary mb-4" />
            <p>Loading Admin Dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-6xl">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Admin Only</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Platform Analytics
            </h1>
            <p className="mt-2 text-muted-foreground">
              Overview of SchemeSetu usage, eligibility checks, and scheme applications.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-4 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registered Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matches Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalChecks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Schemes Saved</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSaved}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Schemes Applied</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalApplied}</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Matched Schemes</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {topSchemes.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topSchemes} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No matching data available yet.
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Matched", value: stats.totalChecks - stats.totalSaved - stats.totalApplied },
                    { name: "Saved", value: stats.totalSaved },
                    { name: "Applied", value: stats.totalApplied },
                  ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
