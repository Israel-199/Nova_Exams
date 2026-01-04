// import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ExamsSection } from "@/components/ExamsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
   <div className="min-h-screen bg-background relative overflow-x-hidden">
  <main className="w-full overflow-x-hidden">
    <HeroSection />
    <ServicesSection />
    <ExamsSection />
    <TestimonialsSection />
    <CTASection />
  </main>
  <Footer />
  <ChatBot />
  <WhatsAppButton />
</div>

  );
};

export default Index;
