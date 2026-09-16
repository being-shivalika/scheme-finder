import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Search, Shield, Zap, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const stats = [
    { value: "180+", label: "Central & State Schemes" },
    { value: "₹10L+", label: "Potential Benefits" },
    { value: "Free", label: "Eligibility Check" },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "AI-powered engine matches your profile with eligible schemes instantly.",
    },
    {
      icon: Shield,
      title: "Verified Information",
      description: "All scheme details sourced from official government portals.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get personalized scheme recommendations in seconds, not hours.",
    },
  ];

  const steps = [
    { step: "01", title: "Enter Your Details", description: "Fill in basic information about yourself - age, income, occupation, and more." },
    { step: "02", title: "AI Analysis", description: "Our AI analyzes your profile against hundreds of government schemes." },
    { step: "03", title: "Get Matched Schemes", description: "Receive a personalized list of schemes you're likely eligible for." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-gradient opacity-5 blur-3xl rounded-full" />
          </div>
          
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t("hero.powered")}</span>
              </div>
              
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t("hero.title1")}
                <span className="text-gradient block mt-2">{t("hero.title2")}</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                {t("hero.desc")}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/find-schemes">
                  <Button variant="hero" size="xl" className="group">
                    {t("hero.cta.check")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/schemes">
                  <Button variant="outline" size="xl">
                    {t("hero.cta.browse")}
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Why Use SchemeSetu?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                We simplify the complex world of government schemes so you don't miss out on what you deserve.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-elegant animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hero-gradient mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three simple steps to find your eligible schemes
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.step} className="relative text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-display text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Schemes Across Categories
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                From housing to healthcare, education to entrepreneurship – find schemes that matter to you.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { name: "Housing", filter: "Housing" },
                { name: "Healthcare", filter: "Healthcare" },
                { name: "Education", filter: "Education" },
                { name: "Agriculture", filter: "Agriculture" },
                { name: "Business", filter: "Business & Entrepreneurship" },
                { name: "Insurance", filter: "Insurance" },
                { name: "Employment", filter: "Employment & Skills" },
                { name: "Women & Child", filter: "Women & Child Welfare" }
              ].map((category) => (
                <Link 
                  key={category.name}
                  to={`/schemes?category=${encodeURIComponent(category.filter)}`}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm font-medium text-card-foreground hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer hover:bg-muted/50"
                >
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl rounded-3xl bg-hero-gradient p-8 md:p-12 text-center text-primary-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Don't Miss Out on Your Benefits
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
                Lakhs of rupees in government schemes go unclaimed every year. Check your eligibility today – it only takes 2 minutes.
              </p>
              <Link to="/find-schemes">
                <Button 
                  size="xl" 
                  className="mt-8 bg-background text-primary hover:bg-background/90"
                >
                  Find Your Schemes Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
