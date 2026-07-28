"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FloralDivider, SmallFlower } from "@/components/ui/FloralElements";

export default function ApresentacaoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" ref={ref} className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#F7F2EA" }}>
      {/* Detalhe decorativo de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(232,222,209,0.5) 0%, transparent 60%),
                           radial-gradient(ellipse at 80% 20%, rgba(231,178,167,0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Divisor ornamental */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <FloralDivider className="w-full max-w-sm mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Coluna de texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left mx-auto max-w-lg md:max-w-none"
          >
            <h2
              className="mb-6"
              style={{ color: "#3D3A36" }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 600, display: "block", lineHeight: 1.2 }}>
                Um retorno
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "#5C5751", display: "inline" }}>
                à{" "}
              </span>
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.2rem", color: "#59613A" }}>
                essência.
              </span>
            </h2>

            <div className="space-y-4">
              <p style={{ color: "#5C5751", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem" }}>
                Em meio à rotina, às responsabilidades e aos desafios, existe um convite para voltar
                ao lugar onde tudo começou: a presença de Deus.
              </p>
              <p style={{ color: "#5C5751", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem" }}>
                O DVJ — De Volta ao Jardim — é um congresso criado para reunir mulheres em um tempo
                de Palavra, comunhão, louvor e renovação espiritual.
              </p>
              <p style={{ color: "#5C5751", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem" }}>
                Mais do que um evento, será uma oportunidade para desacelerar, ouvir a voz de Deus
                e recordar a identidade e o propósito que Ele nos concedeu.
              </p>
            </div>

            {/* Frase em destaque */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 pl-0 md:pl-6 relative pt-4 md:pt-0"
              style={{ borderLeft: "3px solid transparent" }}
            >
              <div className="absolute left-0 top-0 w-full h-[3px] md:w-[3px] md:h-full bg-[#B98942]" />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.35rem",
                  fontStyle: "italic",
                  color: "#59613A",
                  lineHeight: 1.6,
                }}
              >
                "Existe um jardim onde o coração volta a florescer."
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Coluna visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Card visual elegante com elementos botânicos */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #EDE0D4, #E8DED1)",
                padding: "3rem 2.5rem",
                border: "1px solid rgba(185,137,66,0.2)",
                boxShadow: "0 20px 60px rgba(89,97,58,0.1)",
              }}
            >
              {/* Flores decorativas */}
              <div className="absolute top-4 right-4">
                <SmallFlower size={50} color="#E7B2A7" style={{ opacity: 0.6 }} />
              </div>
              <div className="absolute bottom-4 left-4">
                <SmallFlower size={35} color="#BE745B" style={{ opacity: 0.4 }} />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-3">
                <SmallFlower size={20} color="#B98942" style={{ opacity: 0.3 }} />
              </div>

              {/* Conteúdo do card */}
              <div className="text-center relative z-10">
                <div className="mb-6">
                  <span
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "3.5rem",
                      color: "#59613A",
                      lineHeight: 1.2,
                    }}
                  >
                    Jardim
                  </span>
                </div>

                <div className="space-y-4 text-sm" style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif" }}>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                    <span>Palavra</span>
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                    <span>Presença</span>
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                    <span>Comunhão</span>
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                    <span>Propósito</span>
                    <div className="w-8 h-px" style={{ background: "#B98942", opacity: 0.5 }} />
                  </div>
                </div>

                <div className="mt-8">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontStyle: "italic",
                      color: "#8A8480",
                      lineHeight: 1.7,
                    }}
                  >
                    "Gênesis 3:8 — E ouviram a voz do SENHOR Deus..."
                  </p>
                </div>

                {/* Ornamento dourado */}
                <div className="mt-6 flex justify-center">
                  <div className="w-24 h-px" style={{ background: "linear-gradient(to right, transparent, #B98942, transparent)" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divisor final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16"
        >
          <FloralDivider className="w-full max-w-sm mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
