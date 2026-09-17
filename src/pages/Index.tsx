import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientWaves from "@/components/GradientWaves";
import WebThreads from "@/components/WebThreads";
import TargetCursor from "@/components/TargetCursor";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  Search,
  Shield,
  Zap,
  Home,
  HeartPulse,
  GraduationCap,
  Sprout,
  Briefcase,
  ShieldCheck,
  Users,
  Baby,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { name: "Housing", filter: "Housing", icon: Home },
  { name: "Healthcare", filter: "Healthcare", icon: HeartPulse },
  { name: "Education", filter: "Education", icon: GraduationCap },
  { name: "Agriculture", filter: "Agriculture", icon: Sprout },
  { name: "Business", filter: "Business & Entrepreneurship", icon: Briefcase },
  { name: "Insurance", filter: "Insurance", icon: ShieldCheck },
  { name: "Employment", filter: "Employment & Skills", icon: Users },
  { name: "Women & Child", filter: "Women & Child Welfare", icon: Baby },
];

const Index = () => {
  const { t } = useLanguage();
  const browseScopeRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: Search,
      title: "Rules-Based Matching",
      description: "Structured eligibility rules evaluate your profile against verified scheme criteria.",
    },
    {
      icon: Shield,
      title: "Verified Sources",
      description: "Every scheme includes attribution so you can confirm details on official portals.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Only schemes that pass verified rules are recommended — no catalog spam.",
    },
  ];

  const steps = [
    { step: "01", title: "Enter Your Details", description: "Age, income, occupation, category, and location." },
    { step: "02", title: "Rule Evaluation", description: "The engine checks structured AND/OR eligibility trees." },
    { step: "03", title: "Get Matches", description: "See eligible schemes with reasons and apply links." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-abyss">
      <Header />

      <main className="flex-1">
        {/* Hero — full viewport with GradientWaves (nav floats over) */}
        <section className="relative flex min-h-dvh items-center overflow-hidden bg-void">
          <div className="absolute inset-0 z-0">
            <GradientWaves
              horizonColor="#5227FF"
              waveColor="#FF9FFC"
              crestColor="#FFFFFF"
              speed={0.4}
              amplitude={2.5}
              waveScale={0.6}
              waveRatio={0.9}
              swell={35}
              turbulence={20}
              tilt={1.11}
              zoom={1}
              height={5.5}
              fogDepth={15}
              detail="medium"
              brightness={1}
              opacity={1}
              mouseInteraction
              parallaxStrength={0.5}
              grain
              grainIntensity={0.05}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-abyss/85" />
          </div>

          <div className="container relative z-10 grid w-full items-center gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-0 lg:gap-16">
            <div className="animate-fade-in space-y-6 md:space-y-7">
              <p className="section-eyebrow">{t("hero.powered")}</p>
              <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-quartz sm:text-5xl md:text-[52px] lg:text-[64px]">
                {t("hero.title1")}
                <span className="mt-1 block text-lilac">{t("hero.title2")}</span>
              </h1>
              <p className="max-w-md text-[17px] font-light leading-relaxed text-ash">
                {t("hero.desc")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/find-schemes">
                  <Button variant="default" size="xl" className="group w-full sm:w-auto">
                    {t("hero.cta.check")}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to="/schemes">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    {t("hero.cta.browse")}
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-[14px] text-mist">
                <span>180+ schemes indexed</span>
                <span>Verified-rule matches only</span>
                <span>Free forever</span>
              </div>
            </div>

            {/* Product mock — eligibility panel */}
            <div className="relative hidden animate-slide-up md:block">
              <div className="surface-card shadow-float overflow-hidden p-0">
                <div className="flex items-center justify-between border-b border-inkline px-4 py-3">
                  <span className="font-mono text-[13px] text-ash">eligibility.match.json</span>
                  <span className="rounded-full bg-cobalt px-2.5 py-0.5 text-[11px] font-medium text-lilac">
                    live
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.6] text-mist md:p-6 md:text-[14px]">
                  <code>
                    <span className="text-plasma">{"{"}</span>
                    {"\n  "}
                    <span className="text-[#28b6ff]">"status"</span>
                    {": "}
                    <span className="text-[#28b6ff]">"eligible"</span>
                    {",\n  "}
                    <span className="text-[#28b6ff]">"scheme"</span>
                    {": "}
                    <span className="text-[#28b6ff]">"PM-KISAN"</span>
                    {",\n  "}
                    <span className="text-[#28b6ff]">"reasons"</span>
                    {": [\n    "}
                    <span className="text-[#28b6ff]">"occupation = farmer"</span>
                    {",\n    "}
                    <span className="text-[#28b6ff]">"income ≤ 1.5L"</span>
                    {"\n  ],\n  "}
                    <span className="text-[#28b6ff]">"confidence"</span>
                    {": "}
                    <span className="text-[#28b6ff]">"verified"</span>
                    {"\n"}
                    <span className="text-plasma">{"}"}</span>
                  </code>
                </pre>
              </div>
              <div className="absolute -bottom-5 -left-4 w-[72%] surface-highlight p-4 shadow-float lg:-bottom-6 lg:p-5">
                <p className="font-mono text-[12px] text-ash">match summary</p>
                <p className="mt-1 font-display text-2xl text-quartz lg:text-3xl">3 eligible</p>
                <p className="text-[13px] text-mist">of 12 verified-rule schemes checked</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative overflow-hidden py-20 md:py-[80px]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(50% 60% at 50% 0%, rgba(98, 95, 255, 0.12) 0%, transparent 60%)",
            }}
          />
          <div className="container relative">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <p className="section-eyebrow mb-3">Why SchemeSetu</p>
              <h2 className="font-display text-heading-sm text-quartz md:text-heading">
                Built for clarity, not clutter
              </h2>
              <p className="mt-4 text-[16px] font-light text-ash">
                We simplify government scheme discovery so you don’t miss benefits you qualify for.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delayMs={index * 100}>
                  <article className="feature-card group h-full cursor-default p-6">
                    <div className="relative mb-5 inline-flex">
                      <div className="icon-orbit absolute inset-0 rounded-xl" />
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-sapphire bg-cobalt transition-transform duration-300 group-hover:scale-110 group-hover:border-signal/50">
                        <feature.icon className="h-5 w-5 text-signal transition-colors group-hover:text-lilac" />
                      </div>
                    </div>
                    <h3 className="font-sans text-[20px] font-medium tracking-tight text-quartz">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[15px] font-light leading-relaxed text-mist">
                      {feature.description}
                    </p>
                    <div className="mt-5 h-px w-0 bg-gradient-to-r from-signal to-lilac transition-all duration-500 group-hover:w-16" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative overflow-hidden border-y border-inkline bg-void py-20 md:py-[80px]">
          <div className="absolute inset-0 z-0">
            <WebThreads
              color1="#5227FF"
              color2="#FF9FFC"
              color3="#FFFFFF"
              speed={0.2}
              threadCount={6}
              frequency={5.0}
              spread={0.18}
              taper={1.0}
              position={0.5}
              fanMode="center"
              glow={0.02}
              falloff={0.6}
              thickness={1.1}
              brightness={0.55}
              opacity={0.85}
              mirror
              shimmer={false}
              grain
              grainIntensity={0.05}
              mouseInteraction
              mouseStrength={0.3}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-void/55" />
          </div>

          <div className="container relative z-10">
            <Reveal className="mx-auto mb-14 max-w-2xl text-center">
              <p className="section-eyebrow mb-3">Process</p>
              <h2 className="font-display text-heading-sm text-quartz md:text-heading">
                How it works
              </h2>
              <p className="mt-3 text-[15px] font-light text-ash">
                Three steps from profile to verified matches.
              </p>
            </Reveal>

            <div className="relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px md:block">
                <div className="step-rail h-full w-full rounded-full" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {steps.map((step, index) => (
                  <Reveal key={step.step} delayMs={index * 120}>
                    <article className="step-card group h-full p-6 text-center">
                      <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                        <span className="absolute inset-0 rounded-full border border-obsidian bg-cobalt transition-all duration-300 group-hover:scale-110 group-hover:border-lilac/40 group-hover:bg-deep-sea" />
                        <span className="relative font-mono text-[15px] font-medium text-lilac transition-colors group-hover:text-quartz">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="font-sans text-[18px] font-medium text-quartz">{step.title}</h3>
                      <p className="mt-2 text-[14px] font-light leading-relaxed text-ash">
                        {step.description}
                      </p>
                      <div className="mx-auto mt-5 flex justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="h-1 w-1 rounded-full bg-signal" />
                        <span className="h-1 w-1 rounded-full bg-lilac" />
                        <span className="h-1 w-1 rounded-full bg-plasma" />
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories + CTA */}
        <section
          ref={browseScopeRef}
          className="browse-section relative overflow-hidden border-t border-white/5 pb-20 pt-20 md:pb-[80px] md:pt-[80px]"
        >
          <TargetCursor
            scopeRef={browseScopeRef}
            spinDuration={2}
            hideDefaultCursor
            parallaxOn
            cursorColor="#ffffff"
            cursorColorOnTarget="#85a6e9"
          />

          {/* Soft ambient (no WebThreads) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(55% 50% at 50% 0%, rgba(98, 95, 255, 0.14) 0%, transparent 55%), radial-gradient(40% 45% at 100% 80%, rgba(255, 125, 218, 0.08) 0%, transparent 50%), radial-gradient(35% 40% at 0% 70%, rgba(40, 98, 215, 0.1) 0%, transparent 50%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            }}
          />

          <div className="container relative z-10">
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <p className="section-eyebrow mb-3">Browse</p>
              <h2 className="font-display text-heading-sm text-quartz md:text-heading">
                Schemes across categories
              </h2>
              <p className="mt-3 text-[15px] font-light text-ash">
                Jump into a category — or check eligibility for verified matches.
              </p>
            </Reveal>

            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {categories.map((category, index) => (
                <Reveal key={category.name} delayMs={index * 45}>
                  <Link
                    to={`/schemes?category=${encodeURIComponent(category.filter)}`}
                    className="cursor-target group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-deep-sea/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-aurora/45 hover:bg-cobalt/70 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_32px_rgba(98,95,255,0.12)] sm:p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(120% 80% at 0% 0%, rgba(98, 95, 255, 0.18), transparent 55%)",
                      }}
                    />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-void/50 transition-colors group-hover:border-aurora/40 group-hover:bg-aurora/15">
                      <category.icon className="h-5 w-5 text-signal transition-colors group-hover:text-lilac" />
                    </div>
                    <div className="relative">
                      <p className="text-[14px] font-medium text-mist transition-colors group-hover:text-quartz sm:text-[15px]">
                        {category.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-light text-ash opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Explore schemes
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delayMs={220} className="mx-auto mt-14 max-w-3xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-cobalt/40 to-deep-sea/90 px-8 py-12 text-center shadow-float md:px-12 md:py-14">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lilac/60 to-transparent" />
                <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-aurora/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-44 rounded-full bg-plasma/20 blur-3xl" />

                <p className="relative section-eyebrow mb-3">Get started</p>
                <h2 className="relative font-display text-heading-sm text-quartz md:text-heading">
                  Don’t miss out on your benefits
                </h2>
                <p className="relative mx-auto mt-4 max-w-xl text-[16px] font-light text-ash">
                  Check your eligibility in about two minutes. Recommendations only include verified
                  rule matches.
                </p>
                <Link to="/find-schemes" className="relative mt-8 inline-block">
                  <Button size="xl" variant="default" className="cursor-target group">
                    Find Your Schemes
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
