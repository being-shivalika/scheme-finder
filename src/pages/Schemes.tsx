import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemeCard from "@/components/SchemeCard";
import { schemeCategories } from "@/data/schemes";
import { useSchemes } from "@/hooks/useSchemes";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Loader2 } from "lucide-react";

const Schemes = () => {
  const [searchParams] = useSearchParams();
  const { schemes: allSchemes, loading: schemesLoading } = useSchemes();
  const [searchQuery, setSearchQuery] = useState("");
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "All Categories");

  useEffect(() => {
    if (categoryFromUrl && schemeCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredSchemes = useMemo(() => {
    return allSchemes.filter((scheme) => {
      const matchesSearch = 
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.ministry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All Categories" || scheme.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allSchemes, searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container px-4">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Browse Government Schemes
              </h1>
              <p className="mt-4 text-muted-foreground">
                Explore all central government schemes. Use filters to narrow down by category or search for specific schemes.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur py-4">
          <div className="container px-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes by name, ministry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <div className="flex items-center gap-2 sm:w-64">
                <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemeCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container px-4">
            {schemesLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading schemes data...</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredSchemes.length} of {allSchemes.length} schemes
                </p>
                
                {filteredSchemes.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSchemes.map((scheme) => (
                      <SchemeCard key={scheme.id} scheme={scheme} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-lg font-semibold text-foreground">No schemes found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
            </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schemes;
