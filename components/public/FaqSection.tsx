"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";

const faqItems = [
  {
    pergunta: "A confirmação de presença já garante minha vaga?",
    resposta: "Não. A confirmação de presença registra seu interesse em participar. A confirmação dependerá das próximas etapas divulgadas pela organização.",
  },
  {
    pergunta: "Preciso pagar alguma coisa agora?",
    resposta: "Não. Nenhum pagamento será solicitado durante a confirmação de presença.",
  },
  {
    pergunta: "Por que preciso informar meus dados?",
    resposta: "Os dados serão utilizados para organização do congresso e envio das informações necessárias sobre as próximas etapas.",
  },
  {
    pergunta: "Posso atualizar meus dados depois?",
    resposta: "Sim. Entre em contato com a organização para solicitar a atualização.",
  },
  {
    pergunta: "Quando receberei novas informações?",
    resposta: "A equipe entrará em contato quando as datas, programação e inscrições definitivas forem divulgadas.",
  },
  {
    pergunta: "Posso confirmar presença para outra pessoa?",
    resposta: "Cada participante deve realizar sua própria confirmação de presença com dados pessoais e meios de contato válidos.",
  },
];

function FaqItem({ pergunta, resposta, index }: { pergunta: string; resposta: string; index: number }) {
  const [aberto, setAberto] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(185,137,66,0.2)", background: "white" }}
    >
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex flex-col items-center justify-center p-5 text-center transition-colors hover:bg-[#F7F2EA]"
        aria-expanded={aberto}
        id={`faq-${index}`}
        style={{ cursor: "pointer" }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: aberto ? "#59613A" : "#3D3A36",
            lineHeight: 1.4,
          }}
          className="mb-3"
        >
          {pergunta}
        </span>
        <motion.div
          animate={{ rotate: aberto ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} color="#59613A" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: aberto ? 1 : 0, height: aberto ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              className="px-5 pb-5 text-center"
              style={{
                borderTop: "1px solid rgba(185,137,66,0.1)",
                paddingTop: "1rem",
              }}
            >
              <p
                style={{
                  color: "#5C5751",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                }}
              >
                {resposta}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="duvidas" ref={ref} className="py-20 md:py-28 relative" style={{ background: "linear-gradient(180deg, #EDE0D4 0%, #E8DED1 100%)" }}>
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="selo mb-4 inline-flex">
            <SmallFlower size={12} color="#B98942" /> Dúvidas Frequentes
          </span>
          <h2 className="mt-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#3D3A36" }}>
            Perguntas{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#59613A" }}>
              frequentes
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <FaqItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
