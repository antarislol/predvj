"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SmallFlower } from "@/components/ui/FloralElements";

const pilares = [
  {
    icon: "✦",
    titulo: "PRESENÇA",
    cursivo: "Presença",
    texto: "Um tempo para silenciar as distrações e direcionar novamente o coração para Deus.",
    cor: "#59613A",
  },
  {
    icon: "✦",
    titulo: "PALAVRA",
    cursivo: "Palavra",
    texto: "Ensinamentos que fortalecem a fé, renovam a mente e nos aproximam da verdade.",
    cor: "#BE745B",
  },
  {
    icon: "✦",
    titulo: "COMUNHÃO",
    cursivo: "Comunhão",
    texto: "Mulheres reunidas para compartilhar experiências, apoiar umas às outras e crescer juntas.",
    cor: "#B98942",
  },
  {
    icon: "✦",
    titulo: "PROPÓSITO",
    cursivo: "Propósito",
    texto: "Um convite para recordar quem somos em Deus e viver de acordo com o chamado que recebemos.",
    cor: "#8D9875",
  },
];

export default function PilaresSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="culto DVJ"
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EDE0D4 0%, #E8DED1 100%)" }}
    >
      {/* Fundo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(247,242,234,0.6) 0%, transparent 60%)`,
        }}
      />

      {/* Flores de fundo */}
      <div className="absolute top-8 right-8 pointer-events-none hidden md:block">
        <SmallFlower size={60} color="#E7B2A7" style={{ opacity: 0.25 }} />
      </div>
      <div className="absolute bottom-8 left-8 pointer-events-none hidden md:block">
        <SmallFlower size={45} color="#BE745B" style={{ opacity: 0.2 }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span
            className="selo mb-4 inline-flex"
          >
            <SmallFlower size={12} color="#B98942" /> O Culto DVJ
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 600,
              color: "#3D3A36",
              lineHeight: 1.3,
            }}
          >
            O que queremos{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", color: "#59613A" }}>
              viver juntas.
            </span>
          </h2>
        </motion.div>

        {/* Cards dos pilares */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilares.map((pilar, index) => (
            <motion.div
              key={pilar.titulo}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="card-elegant text-center relative"
              style={{ borderTop: `3px solid ${pilar.cor}` }}
            >
              {/* Florzinha decorativa no topo */}
              <div className="flex justify-center -mt-4 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${pilar.cor}15`, border: `1px solid ${pilar.cor}30` }}
                >
                  <SmallFlower size={20} color={pilar.cor} />
                </div>
              </div>

              {/* Título cursivo */}
              <div className="mb-1">
                <span
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "1.8rem",
                    color: pilar.cor,
                    lineHeight: 1.2,
                  }}
                >
                  {pilar.cursivo}
                </span>
              </div>

              {/* Título maiúsculo */}
              <h3
                className="mb-4 text-xs tracking-widest font-semibold"
                style={{
                  color: pilar.cor,
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.15em",
                }}
              >
                {pilar.titulo}
              </h3>

              {/* Divisor ornamental */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${pilar.cor}60, transparent)` }} />
              </div>

              {/* Texto */}
              <p
                style={{
                  color: "#5C5751",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {pilar.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
