import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeatureSection from "@/components/landing/FeatureSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import FaqSection from "@/components/landing/FaqSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-purple-500 selection:text-white font-sans">
      <Navbar />

      {/* --- BACKGROUND SYSTEM (AMBIENT LIGHTS) --- */}
      <div className="fixed inset-0 z-[-1] h-full w-full bg-white dark:bg-[#050505] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob opacity-70"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000 opacity-70"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 dark:bg-pink-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000 opacity-70"></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeatureSection />
      <TestimonialSection />
      <FaqSection />
      <PricingSection />
      <Footer />
    </div>
  );
}