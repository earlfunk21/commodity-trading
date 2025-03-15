import FAQSection from "@/app/(main)/_components/faq-section";
import Features from "@/app/(main)/_components/features";
import Hero from "@/app/(main)/_components/hero";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black pt-16">
        <div className="container mx-auto max-w-4xl">
          <Hero />
        </div>
      </main>
      <section className="bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="container mx-auto max-w-4xl">
          <Features />
        </div>
      </section>
      <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <div className="container mx-auto max-w-4xl">
          <FAQSection />
        </div>
      </section>
    </>
  );
}
