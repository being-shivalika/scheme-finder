import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1 py-16">
      <div className="container px-4 max-w-2xl mx-auto space-y-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Contact</h1>
        <p className="text-muted-foreground leading-relaxed">
          SchemeSetu is an informational prototype. For scheme applications and official queries,
          please use the government portals linked on each scheme card.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Project feedback and contributions: open an issue on the repository hosting this codebase.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;
