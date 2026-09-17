import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { session, signOut } = useAuth();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/schemes", label: t("nav.browse") },
    { path: "/find-schemes", label: t("nav.find") },
    { path: "/for-you", label: t("nav.foryou") },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent px-3 pt-3 md:px-4 md:pt-4">
      <div className="pointer-events-auto container max-w-page px-0">
        <div className="flex h-12 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 shadow-elegant backdrop-blur-xl md:h-14 md:px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2 pl-1">
            <img
              src="/logo.png"
              alt="SchemeSetu"
              className="h-7 w-7 rounded-full object-contain md:h-8 md:w-8"
            />
            <span className="font-display text-[15px] font-medium tracking-tight text-quartz md:text-[16px]">
              SchemeSetu
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 rounded-full bg-deep-sea/60 p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[13px] font-normal transition-colors",
                  location.pathname === link.path
                    ? "bg-cobalt text-quartz"
                    : "text-ash hover:text-quartz"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              title="Toggle Language"
              className="h-9 gap-1.5 rounded-full text-ash"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">{language}</span>
            </Button>

            {session ? (
              <Button variant="outline" size="sm" className="h-9 rounded-full" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="h-9 rounded-full">
                  Sign In
                </Button>
              </Link>
            )}

            <Link to="/find-schemes">
              <Button variant="default" size="sm" className="h-9 rounded-full">
                {t("nav.check")}
              </Button>
            </Link>
          </div>

          <button
            className="mr-1 rounded-full p-2 text-ash hover:bg-white/5 hover:text-quartz md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mt-2 rounded-3xl border border-white/10 bg-void/90 p-3 shadow-elegant backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-full px-4 py-2.5 text-sm transition-colors",
                    location.pathname === link.path
                      ? "bg-cobalt text-quartz"
                      : "text-ash hover:text-quartz"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/find-schemes" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="mt-2 w-full rounded-full">
                  Check Eligibility
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
