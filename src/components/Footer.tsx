import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <footer className="mt-auto border-t border-inkline bg-void">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="SchemeSetu"
                className="h-8 w-8 rounded-lg object-contain"
              />
              <span className="font-display text-lg font-medium text-quartz">SchemeSetu</span>
            </Link>
            <p className="max-w-xs text-[15px] font-light leading-relaxed text-ash">
              Helping Indian citizens discover government schemes with verified, rules-based eligibility matching.
            </p>
          </div>

          <div className="space-y-4">
            <p className="section-eyebrow">Quick Links</p>
            <ul className="space-y-2.5">
              {[
                { to: "/schemes", label: "Browse All Schemes" },
                { to: "/find-schemes", label: "Check Eligibility" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                ...(isAdmin ? [{ to: "/admin", label: "Admin Dashboard" }] : []),
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[14px] text-mist transition-colors hover:text-quartz"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="section-eyebrow">Disclaimer</p>
            <p className="text-[13px] font-light leading-relaxed text-ash">
              Informational tool only. Verify eligibility on official government websites before applying.
              We do not guarantee approval of any scheme.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-inkline pt-8 sm:flex-row">
          <p className="text-xs text-ash">© 2026 SchemeSetu. For informational purposes only.</p>
          <p className="font-mono text-xs text-slate">rules-engine · not legal advice</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
