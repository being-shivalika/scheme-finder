import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scheme } from "@/types/scheme";
import { Button } from "./ui/button";
import { ExternalLink, CheckCircle2, Bookmark, CircleCheck, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

interface SchemeCardProps {
  scheme: Scheme;
  showMatchScore?: boolean;
  status?: "matched" | "saved" | "applied";
  /** Parent owns the full save flow (e.g. For You dashboard). */
  onSave?: (schemeId: string) => void;
  /** Parent owns the full apply flow. */
  onApply?: (schemeId: string) => void;
  /** Fired after built-in save/apply succeeds (browse page status map). */
  onStatusChange?: (schemeId: string, status: "saved" | "applied") => void;
}

const SchemeCard = ({
  scheme,
  showMatchScore = false,
  status = "matched",
  onSave,
  onApply,
  onStatusChange,
}: SchemeCardProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [localStatus, setLocalStatus] = useState(status);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const isEligible = scheme.matchStatus === "eligible";
  const needsVerify = scheme.matchStatus === "needs_verification";
  const eligibilityTags = (scheme.eligibility || []).slice(0, 2);
  const moreEligibility = Math.max(0, (scheme.eligibility || []).length - 2);

  const requireAuth = () => {
    if (session) return true;
    toast({
      title: "Please log in",
      description: "Sign in to save schemes and track applications.",
      variant: "destructive",
    });
    navigate("/login");
    return false;
  };

  const persistStatus = async (next: "saved" | "applied") => {
    if (!requireAuth()) return;
    setBusy(true);
    const prev = localStatus;
    setLocalStatus(next);
    try {
      const res = await apiFetch(`/api/user-schemes/${encodeURIComponent(scheme.id)}`, {
        method: "PUT",
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed");
      onStatusChange?.(scheme.id, next);
      toast({
        title: "Success",
        description:
          next === "saved" ? "Scheme saved to your profile." : "Marked as applied.",
      });
    } catch {
      setLocalStatus(prev);
      toast({
        title: "Error",
        description: "Could not update status.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(scheme.id);
      setLocalStatus("saved");
      return;
    }
    void persistStatus("saved");
  };

  const handleApply = () => {
    if (onApply) {
      onApply(scheme.id);
      setLocalStatus("applied");
      return;
    }
    void persistStatus("applied");
  };

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-deep-sea/60 shadow-elegant backdrop-blur-sm transition-all duration-300",
        "hover:border-aurora/40 hover:shadow-[0_0_40px_rgba(98,95,255,0.12)]"
      )}
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-mist">
            {scheme.category}
          </span>
          {(showMatchScore || isEligible || needsVerify) && (
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                isEligible && "bg-aurora/20 text-lilac",
                needsVerify && "border border-white/10 bg-void text-ash",
                !isEligible && !needsVerify && "bg-cobalt text-lilac"
              )}
            >
              {isEligible ? "Eligible" : needsVerify ? "Verify" : "Match"}
            </span>
          )}
        </div>

        <h3 className="font-display text-[17px] font-medium leading-snug tracking-tight text-quartz transition-colors group-hover:text-lilac line-clamp-2">
          {scheme.name}
        </h3>
        <p className="mt-1.5 text-[12px] text-ash line-clamp-1">{scheme.ministry}</p>

        <p className="mt-3 text-[13px] font-light leading-relaxed text-mist line-clamp-2">
          {scheme.description}
        </p>

        {isEligible && scheme.matchReason && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-aurora/25 bg-aurora/10 px-3 py-2">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lilac" />
            <p className="text-[12px] leading-snug text-mist line-clamp-2">{scheme.matchReason}</p>
          </div>
        )}
        {needsVerify && (
          <div className="mt-3 rounded-xl border border-white/10 bg-void/60 px-3 py-2">
            <p className="text-[12px] font-medium text-ash">Needs verification</p>
            {scheme.missingFields && scheme.missingFields.length > 0 && (
              <p className="mt-0.5 text-[11px] text-mist line-clamp-1">
                Missing: {scheme.missingFields.join(", ")}
              </p>
            )}
          </div>
        )}

        <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
          {scheme.benefits && (
            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-ash">
                Benefits
              </p>
              <p className="text-[13px] font-light text-mist line-clamp-2">{scheme.benefits}</p>
            </div>
          )}

          {eligibilityTags.length > 0 && (
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-ash">
                Eligibility
              </p>
              <div className="flex flex-wrap gap-1.5">
                {eligibilityTags.map((criterion, index) => (
                  <span
                    key={index}
                    className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-mist"
                  >
                    <CheckCircle2 className="h-3 w-3 shrink-0 text-signal" />
                    <span className="truncate">{criterion}</span>
                  </span>
                ))}
                {moreEligibility > 0 && (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-ash">
                    +{moreEligibility} more
                  </span>
                )}
              </div>
            </div>
          )}

          {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
            <p className="flex items-start gap-1.5 text-[11px] text-ash">
              <FileText className="mt-0.5 h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{scheme.requiredDocuments.slice(0, 3).join(" · ")}</span>
            </p>
          )}

          {scheme.sourceName && (
            <p className="text-[11px] text-ash">
              Source:{" "}
              {scheme.sourceUrl ? (
                <a
                  href={scheme.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal hover:underline"
                >
                  {scheme.sourceName}
                </a>
              ) : (
                scheme.sourceName
              )}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto space-y-2 border-t border-white/5 bg-void/40 p-4">
        {scheme.applicationLink && (
          <Button asChild variant="default" className="w-full" size="sm">
            <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
              Go to Portal
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        )}

        <div className="flex gap-2">
          {localStatus === "applied" ? (
            <div className="flex w-full items-center justify-center gap-1.5 rounded-full border border-aurora/30 bg-aurora/10 py-2 text-[13px] font-medium text-lilac">
              <CircleCheck className="h-3.5 w-3.5" />
              Applied
            </div>
          ) : (
            <>
              {localStatus !== "saved" ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5 border-white/15"
                  disabled={busy}
                  onClick={handleSave}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  Save
                </Button>
              ) : (
                <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 py-2 text-[13px] text-mist">
                  <Bookmark className="h-3.5 w-3.5" />
                  Saved
                </div>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 gap-1.5"
                disabled={busy}
                onClick={handleApply}
              >
                <CircleCheck className="h-3.5 w-3.5" />
                Applied
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default SchemeCard;
