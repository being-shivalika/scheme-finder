import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1 py-16">
      <div className="container px-4 max-w-2xl mx-auto space-y-6">
        <h1 className="font-display text-3xl font-bold text-foreground">About SchemeSetu</h1>
        <p className="text-muted-foreground leading-relaxed">
          SchemeSetu helps citizens discover Indian government schemes using structured eligibility rules
          and clear source attribution. Matching is deterministic — we evaluate your profile against known
          criteria and only recommend schemes that pass verified rules.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Always confirm details on official portals such as{" "}
          <a className="text-primary underline" href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer">
            myScheme.gov.in
          </a>{" "}
          before applying.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
