"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FloralLeft, FloralRight, SmallFlower } from "@/components/ui/FloralElements";

export default function ChamadaFinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#pre-inscricao");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #3E4728 0%, #59613A 50%, #4A5230 100%)" }}
    >
      {/* Elementos florais decorativos */}
      <div className="absolute left-0 top-0 h-full w-32 md:w-48 pointer-events-none opacity-20">
        <FloralLeft className="h-full w-full" />
      </div>
      <div className="absolute right-0 top-0 h-full w-32 md:w-48 pointer-events-none opacity-20">
        <FloralRight className="h-full w-full" />
      </div>

      {/* Flores flutuantes */}
      <div className="absolute top-8 right-16 pointer-events-none hidden md:block">
        <SmallFlower size={40} color="#F1D0C7" style={{ opacity: 0.25, animation: "float 6s ease-in-out infinite" }} />
      </div>
      <div className="absolute bottom-8 left-16 pointer-events-none hidden md:block">
        <SmallFlower size={30} color="#E7B2A7" style={{ opacity: 0.2, animation: "float 8s ease-in-out infinite 2s" }} />
      </div>

      {/* Fundo com textura suave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(185,137,66,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Ornamento superior */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px" style={{ background: "rgba(185,137,66,0.5)" }} />
            <SmallFlower size={28} color="#B98942" style={{ opacity: 0.8 }} />
            <div className="w-16 h-px" style={{ background: "rgba(185,137,66,0.5)" }} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#F7F2EA", lineHeight: 1.3 }}
        >
          Há um convite esperando
          <br />pelo seu coração.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-6"
        >
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.8rem, 6vw, 4.5rem)", color: "#E7B2A7", lineHeight: 1.2 }}>
            Volte ao Jardim.
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
          style={{ color: "rgba(247,242,234,0.75)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          Faça sua pré-inscrição e prepare-se para viver um tempo de
          <br className="hidden sm:block" /> presença, comunhão e renovação.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={scrollToForm}
          className="btn-gold text-base px-10"
          id="chamada-final-btn"
          style={{ fontSize: "0.85rem", letterSpacing: "0.1em" }}
        >
          ✦ QUERO PARTICIPAR DO DVJ
        </motion.button>

        {/* Ornamento inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex justify-center mt-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px" style={{ background: "rgba(185,137,66,0.4)" }} />
            <span style={{ color: "rgba(185,137,66,0.6)", fontSize: "1rem" }}>♡</span>
            <div className="w-16 h-px" style={{ background: "rgba(185,137,66,0.4)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
