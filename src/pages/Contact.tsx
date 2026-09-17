import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => (
  <div className="flex min-h-screen flex-col bg-abyss">
    <Header />
    <main className="flex-1 pb-16 pt-28">
      <div className="container mx-auto max-w-2xl space-y-6">
        <p className="section-eyebrow">Contact</p>
        <h1 className="font-display text-heading-sm text-quartz">Contact</h1>
        <p className="text-[16px] font-light leading-relaxed text-ash">
          SchemeSetu is an informational prototype. For scheme applications and official queries,
          please use the government portals linked on each scheme card.
        </p>
        <p className="text-[16px] font-light leading-relaxed text-ash">
          Project feedback and contributions: open an issue on the repository hosting this codebase.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;
