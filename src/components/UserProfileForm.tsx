import { useState } from "react";
import { UserProfile } from "@/types/scheme";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { indianStates } from "@/data/schemes";
import {
  ListChecks,
  Loader2,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  IndianRupee,
  Accessibility,
  Users,
  CircleDollarSign,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const fieldClass =
  "h-11 rounded-xl border-white/10 bg-white/[0.04] text-quartz placeholder:text-slate focus:border-aurora/50 focus:ring-aurora/30";

const UserProfileForm = ({ onSubmit, isLoading }: UserProfileFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: "",
    state: "",
    category: "",
    income: 0,
    occupation: "",
    education: "",
    isDisabled: false,
    isMinority: false,
    isBPL: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filledCount = [
    formData.age,
    formData.gender,
    formData.state,
    formData.category,
    formData.income,
    formData.occupation,
    formData.education,
  ].filter(Boolean).length;
  const progress = Math.round((filledCount / 7) * 100);

  const chips = [
    {
      id: "disabled",
      label: t("form.disabled"),
      icon: Accessibility,
      active: !!formData.isDisabled,
      onToggle: () => updateField("isDisabled", !formData.isDisabled),
    },
    {
      id: "minority",
      label: t("form.minority"),
      icon: Users,
      active: !!formData.isMinority,
      onToggle: () => updateField("isMinority", !formData.isMinority),
    },
    {
      id: "bpl",
      label: t("form.bpl"),
      icon: CircleDollarSign,
      active: !!formData.isBPL,
      onToggle: () => updateField("isBPL", !formData.isBPL),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-aurora/30 bg-aurora/10 shadow-[0_0_40px_rgba(98,95,255,0.25)]">
          <ListChecks className="h-5 w-5 text-lilac" />
        </div>
        <h2 className="font-display text-[28px] font-medium tracking-tight text-quartz md:text-[32px]">
          {t("form.title")}
        </h2>
        <p className="mt-2 text-[15px] font-light text-ash">{t("form.desc")}</p>

        <div className="mx-auto mt-6 max-w-xs">
          <div className="mb-1.5 flex justify-between text-[11px] font-medium uppercase tracking-wider text-ash">
            <span>Profile completeness</span>
            <span className="text-lilac">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#305fbd,#625fff,#ff9ffc)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basics */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-ash">
            <User className="h-3.5 w-3.5 text-signal" />
            Basics
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-mist">
                {t("form.age")}
              </Label>
              <Input
                id="age"
                type="number"
                min={1}
                max={120}
                value={formData.age === 0 ? "" : formData.age}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField("age", value === "" ? 0 : parseInt(value, 10) || 0);
                }}
                className={fieldClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-mist">{t("form.gender")}</Label>
              <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Location & category */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-ash">
            <MapPin className="h-3.5 w-3.5 text-signal" />
            Location & category
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-mist">{t("form.state")}</Label>
              <Select value={formData.state} onValueChange={(v) => updateField("state", v)}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-mist">{t("form.category")}</Label>
              <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="sc">Scheduled Caste (SC)</SelectItem>
                  <SelectItem value="st">Scheduled Tribe (ST)</SelectItem>
                  <SelectItem value="obc">Other Backward Class (OBC)</SelectItem>
                  <SelectItem value="ews">Economically Weaker Section (EWS)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Work & income */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-ash">
            <Briefcase className="h-3.5 w-3.5 text-signal" />
            Work & income
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="income" className="text-mist">
                {t("form.income")}
              </Label>
              <div className="relative">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
                <Input
                  id="income"
                  type="number"
                  min={0}
                  step={5000}
                  value={formData.income === 0 ? "" : formData.income}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateField("income", value === "" ? 0 : parseInt(value, 10) || 0);
                  }}
                  placeholder="e.g., 300000"
                  className={cn(fieldClass, "pl-9")}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-mist">{t("form.occupation")}</Label>
              <Select value={formData.occupation} onValueChange={(v) => updateField("occupation", v)}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employed">Employed (Private)</SelectItem>
                  <SelectItem value="government">Government Employee</SelectItem>
                  <SelectItem value="self-employed">Self-Employed / Business</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="homemaker">Homemaker</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="daily-wage">Daily Wage Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-ash">
            <GraduationCap className="h-3.5 w-3.5 text-signal" />
            Education
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-mist">{t("form.education")}</Label>
              <Select value={formData.education} onValueChange={(v) => updateField("education", v)}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-formal">No Formal Education</SelectItem>
                  <SelectItem value="primary">Primary (1-5)</SelectItem>
                  <SelectItem value="middle">Middle School (6-8)</SelectItem>
                  <SelectItem value="secondary">Secondary (9-10)</SelectItem>
                  <SelectItem value="higher-secondary">Higher Secondary (11-12)</SelectItem>
                  <SelectItem value="diploma">Diploma / ITI</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="post-graduate">Post Graduate</SelectItem>
                  <SelectItem value="professional">Professional Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree" className="text-mist">
                {t("form.degree")}
              </Label>
              <Input
                id="degree"
                type="text"
                value={formData.degree || ""}
                onChange={(e) => updateField("degree", e.target.value)}
                placeholder="e.g. B.Tech, MBBS, B.A."
                className={fieldClass}
              />
            </div>
          </div>
        </section>

        {/* Toggles */}
        <section className="space-y-3">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ash">
            {t("form.additional")}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={chip.onToggle}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-[13px] transition-all",
                  chip.active
                    ? "border-aurora/50 bg-aurora/15 text-quartz shadow-[0_0_24px_rgba(98,95,255,0.2)]"
                    : "border-white/10 bg-white/[0.03] text-mist hover:border-white/20 hover:text-quartz"
                )}
              >
                <chip.icon
                  className={cn("h-4 w-4 shrink-0", chip.active ? "text-lilac" : "text-ash")}
                />
                <span className="leading-snug">{chip.label}</span>
              </button>
            ))}
          </div>
        </section>

        <Button
          type="submit"
          variant="default"
          size="xl"
          className="mt-2 w-full shadow-[0_0_40px_rgba(255,255,255,0.12)]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t("form.loading")}
            </>
          ) : (
            <>
              <ListChecks className="mr-2 h-5 w-5" />
              {t("form.submit")}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UserProfileForm;
