import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemeCard from "@/components/SchemeCard";
import { schemeCategories } from "@/data/schemes";
import { useSchemes } from "@/hooks/useSchemes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Search, Filter, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";

const PAGE_SIZE = 12;

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

const Schemes = () => {
  const [searchParams] = useSearchParams();
  const { session } = useAuth();
  const { schemes: allSchemes, loading: schemesLoading } = useSchemes();
  const [searchQuery, setSearchQuery] = useState("");
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "All Categories");
  const [page, setPage] = useState(1);
  const [statusById, setStatusById] = useState<Record<string, "matched" | "saved" | "applied">>({});

  useEffect(() => {
    if (categoryFromUrl && schemeCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    if (!session) {
      setStatusById({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch("/api/user-schemes");
        if (!res.ok || cancelled) return;
        const rows = await res.json();
        const map: Record<string, "matched" | "saved" | "applied"> = {};
        for (const row of rows) {
          if (row.schemeId && (row.status === "saved" || row.status === "applied" || row.status === "matched")) {
            map[row.schemeId] = row.status;
          }
        }
        if (!cancelled) setStatusById(map);
      } catch {
        /* ignore — cards still allow save/apply */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);

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

  const totalPages = Math.max(1, Math.ceil(filteredSchemes.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageSchemes = filteredSchemes.slice(pageStart, pageStart + PAGE_SIZE);
  const showingFrom = filteredSchemes.length === 0 ? 0 : pageStart + 1;
  const showingTo = Math.min(pageStart + PAGE_SIZE, filteredSchemes.length);

  const goToPage = (p: number) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-abyss">
      <Header />

      <main className="flex-1 pt-20">
        <section className="border-b border-inkline bg-void py-14">
          <div className="container">
            <p className="section-eyebrow mb-3">Catalog</p>
            <h1 className="font-display text-heading-sm text-quartz md:text-heading">
              Browse government schemes
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] font-light text-ash">
              Explore central and state schemes. Filter by category or search by name and ministry.
            </p>
          </div>
        </section>

        <section className="sticky top-16 z-40 border-b border-inkline bg-abyss/95 py-4 backdrop-blur md:top-20">
          <div className="container">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
                <Input
                  placeholder="Search schemes by name, ministry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 sm:w-64">
                <Filter className="h-4 w-4 shrink-0 text-ash" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="rounded-lg border-obsidian bg-void text-quartz">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-obsidian bg-deep-sea text-quartz">
                    {schemeCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container">
            {schemesLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="mb-4 h-8 w-8 animate-spin text-signal" />
                <p className="text-ash">Loading schemes…</p>
              </div>
            ) : (
              <>
                <p className="mb-6 font-mono text-[13px] text-ash">
                  Showing {showingFrom}–{showingTo} of {filteredSchemes.length} schemes
                  {filteredSchemes.length !== allSchemes.length
                    ? ` (filtered from ${allSchemes.length})`
                    : ""}
                </p>

                {pageSchemes.length > 0 ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {pageSchemes.map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          status={statusById[scheme.id] || "matched"}
                          onStatusChange={(id, next) =>
                            setStatusById((prev) => ({ ...prev, [id]: next }))
                          }
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <Pagination className="mt-10">
                        <PaginationContent className="flex-wrap gap-1">
                          <PaginationItem>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 rounded-full"
                              disabled={currentPage <= 1}
                              onClick={() => goToPage(currentPage - 1)}
                            >
                              <ChevronLeft className="h-4 w-4" />
                              Prev
                            </Button>
                          </PaginationItem>

                          {getPageNumbers(currentPage, totalPages).map((item, idx) =>
                            item === "ellipsis" ? (
                              <PaginationItem key={`e-${idx}`}>
                                <span className="flex h-9 w-9 items-center justify-center text-ash">
                                  …
                                </span>
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={item}>
                                <Button
                                  variant={item === currentPage ? "default" : "ghost"}
                                  size="icon"
                                  className={cn(
                                    "h-9 w-9 rounded-full",
                                    item === currentPage && "pointer-events-none"
                                  )}
                                  onClick={() => goToPage(item)}
                                >
                                  {item}
                                </Button>
                              </PaginationItem>
                            )
                          )}

                          <PaginationItem>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 rounded-full"
                              disabled={currentPage >= totalPages}
                              onClick={() => goToPage(currentPage + 1)}
                            >
                              Next
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <Search className="mx-auto mb-4 h-10 w-10 text-slate" />
                    <h3 className="font-display text-lg text-quartz">No schemes found</h3>
                    <p className="mt-2 text-ash">Try adjusting your search or filter</p>
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
