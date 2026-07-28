import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/public/HeroSection";
import ApresentacaoSection from "@/components/public/ApresentacaoSection";
import PilaresSection from "@/components/public/PilaresSection";
import InformacoesSection from "@/components/public/InformacoesSection";
import BeneficiosSection from "@/components/public/BeneficiosSection";
import FormularioSection from "@/components/public/FormularioSection";
import FaqSection from "@/components/public/FaqSection";
import ChamadaFinalSection from "@/components/public/ChamadaFinalSection";

export const metadata: Metadata = {
  title: "DVJ — De Volta ao Jardim | Pré-inscrição",
  description:
    "Faça sua pré-inscrição para o DVJ — De Volta ao Jardim, um congresso de mulheres voltado para comunhão, Palavra, presença e propósito.",
};

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ApresentacaoSection />
      <PilaresSection />
      <InformacoesSection />
      <BeneficiosSection />
      <FormularioSection />
      <FaqSection />
      <ChamadaFinalSection />
      <Footer />
    </main>
  );
}
