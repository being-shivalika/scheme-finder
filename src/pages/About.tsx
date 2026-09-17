import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => (
  <div className="flex min-h-screen flex-col bg-abyss">
    <Header />
    <main className="flex-1 pb-16 pt-28">
      <div className="container mx-auto max-w-2xl space-y-6">
        <p className="section-eyebrow">About</p>
        <h1 className="font-display text-heading-sm text-quartz">About SchemeSetu</h1>
        <p className="text-[16px] font-light leading-relaxed text-ash">
          SchemeSetu helps citizens discover Indian government schemes using structured eligibility
          rules and clear source attribution. Matching is deterministic — we evaluate your profile
          against known criteria and only recommend schemes that pass verified rules.
        </p>
        <p className="text-[16px] font-light leading-relaxed text-ash">
          Always confirm details on official portals such as{" "}
          <a
            className="text-signal underline"
            href="https://www.myscheme.gov.in"
            target="_blank"
            rel="noreferrer"
          >
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
