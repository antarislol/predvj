"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";

const beneficios = [
  "Receber informações importantes sobre o congresso",
  "Ser avisada sobre a abertura das inscrições oficiais",
  "Acompanhar novidades e atualizações do DVJ",
  "Receber orientações sobre programação, local e participação",
  "Facilitar o contato com a equipe de organização",
];

export default function BeneficiosSection() {
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
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #E8DED1 0%, #EDE0D4 100%)" }}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-8 left-8 pointer-events-none hidden md:block">
        <SmallFlower size={55} color="#E7B2A7" style={{ opacity: 0.3 }} />
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none hidden md:block">
        <SmallFlower size={40} color="#B98942" style={{ opacity: 0.25 }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col gap-12 items-center">
          {/* Coluna esquerda - Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <span className="selo mb-4 inline-flex mx-auto">
              <SmallFlower size={12} color="#B98942" /> Por que se inscrever?
            </span>
            <h2 className="mt-4 mb-6 mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 600, color: "#3D3A36", lineHeight: 1.3 }}>
              Dê o primeiro passo para{" "}
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#59613A" }}>
                viver esse momento.
              </span>
            </h2>

            <p className="mb-8 mx-auto" style={{ color: "#5C5751", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem" }}>
              Ao preencher sua presença, você demonstra interesse em participar do DVJ
              e permite que a organização entre em contato assim que as próximas etapas
              forem liberadas.
            </p>

            <button
              onClick={scrollToForm}
              className="btn-primary mx-auto"
              id="beneficios-cta-btn"
            >
              ✦ confirmar minha presença
            </button>
          </motion.div>

          {/* Coluna direita - Benefícios */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg mx-auto"
          >
            <div className="space-y-4 mb-8">
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 justify-center text-center p-3 rounded-xl bg-white/50"
                  style={{ border: "1px solid rgba(185,137,66,0.1)" }}
                >
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0"
                    style={{ color: "#59613A" }}
                  />
                  <p
                    style={{
                      color: "#5C5751",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {beneficio}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Destaque gratuito */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-5 rounded-2xl text-center"
              style={{
                background: "white",
                border: "1px solid rgba(185,137,66,0.25)",
                boxShadow: "0 4px 20px rgba(89,97,58,0.08)",
              }}
            >
              <SmallFlower size={28} color="#B98942" className="mx-auto mb-2" />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#59613A",
                }}
              >
                A confirmação de presença é{" "}
                <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem" }}>
                  gratuita
                </span>
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem",
                  color: "#8A8480",
                  marginTop: "0.5rem",
                }}
              >
                Nenhum pagamento será solicitado neste momento.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
