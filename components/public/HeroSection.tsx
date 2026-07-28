"use client";

import { motion } from "framer-motion";
import { FloralLeft, FloralRight, SmallFlower } from "@/components/ui/FloralElements";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const floralVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#pre-inscricao");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToSobre = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#sobre");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: "linear-gradient(135deg, #F7F2EA 0%, #F0E8DC 40%, #EDE0D4 100%)" }}
    >
      {/* Textura de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.8,
        }}
      />

      {/* Elementos florais laterais */}
      <motion.div
        className="absolute left-0 top-0 h-full w-40 md:w-56 pointer-events-none"
        variants={floralVariant}
        initial="hidden"
        animate="visible"
      >
        <FloralLeft className="h-full w-full animate-float" style={{ opacity: 0.75 }} />
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 h-full w-40 md:w-56 pointer-events-none"
        variants={floralVariant}
        initial="hidden"
        animate="visible"
      >
        <FloralRight className="h-full w-full animate-float" style={{ opacity: 0.75, animationDelay: "1s" }} />
      </motion.div>

      {/* Flores decorativas menores */}
      <div className="absolute top-24 left-8 pointer-events-none hidden md:block">
        <SmallFlower size={40} color="#E7B2A7" style={{ opacity: 0.5, animation: "float 7s ease-in-out infinite" }} />
      </div>
      <div className="absolute bottom-32 right-12 pointer-events-none hidden md:block">
        <SmallFlower size={30} color="#BE745B" style={{ opacity: 0.4, animation: "float 8s ease-in-out infinite 2s" }} />
      </div>
      <div className="absolute top-1/2 left-4 pointer-events-none hidden lg:block">
        <SmallFlower size={20} color="#B98942" style={{ opacity: 0.3, animation: "float 6s ease-in-out infinite 1s" }} />
      </div>

      {/* Conteúdo central */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-16">
        {/* Selo superior */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-6"
        >
          <span className="selo">
            <SmallFlower size={12} color="#B98942" /> Congresso de Mulheres
          </span>
        </motion.div>

        {/* Frase principal */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl font-medium mb-4 leading-relaxed"
          style={{ color: "#5C5751", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.25rem" }}
        >
          Um chamado para retornar à essência, à presença e ao propósito de Deus.
        </motion.p>

        {/* Texto de apoio */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed"
          style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
        >
          Prepare o coração para viver um tempo de comunhão, crescimento e renovação.
          Faça sua pré-inscrição e acompanhe as próximas informações do congresso.
        </motion.p>

        {/* Selo pré-inscrições abertas */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-16"
        >
          <div
            className="px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, rgba(185,137,66,0.15), rgba(185,137,66,0.08))",
              border: "1px solid rgba(185,137,66,0.4)",
              color: "#B98942",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            ✦ Pré-inscrições abertas ✦
          </div>
        </motion.div>

        {/* Botões */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
        >
          <button
            onClick={scrollToForm}
            className="btn-primary text-sm w-full sm:w-auto"
            id="hero-inscricao-btn"
          >
            ✦ Quero fazer minha pré-inscrição
          </button>
          <button
            onClick={scrollToSobre}
            className="btn-secondary text-sm w-full sm:w-auto"
            id="hero-conhecer-btn"
          >
            Conhecer o DVJ
          </button>
        </motion.div>

        {/* Nota de rodapé */}
        <motion.p
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs max-w-sm mx-auto leading-relaxed"
          style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
        >
          A pré-inscrição demonstra seu interesse em participar, mas ainda não representa
          a confirmação definitiva da vaga.
        </motion.p>
      </div>

      {/* Seta scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 0.6 } }}
        style={{ animation: "float 2s ease-in-out infinite" }}
      >
        <button
          onClick={scrollToSobre}
          aria-label="Rolar para baixo"
          style={{ color: "#8D9875", border: "none", background: "none", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
