import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Menu, X, Globe } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <Search className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-display text-xl font-bold text-foreground sm:inline-block">
            SchemeSetu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button and Language Toggle */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            title="Toggle Language (English/Hindi)"
            className="rounded-full"
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">Toggle Language</span>
            <span className="ml-1 text-xs font-bold uppercase">{language}</span>
          </Button>

          {session ? (
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          <Link to="/find-schemes">
            <Button variant="hero" size="sm">
              {t("nav.check")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/find-schemes" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="hero" className="mt-2 w-full">
                Check Eligibility
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
