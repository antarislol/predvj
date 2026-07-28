"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin, Users, BookOpen, Mic } from "lucide-react";
import { SmallFlower, FloralDivider } from "@/components/ui/FloralElements";

const infoItems = [
  { icon: Calendar, label: "Data", valor: "[DATA DO CONGRESSO]" },
  { icon: Clock, label: "Horário", valor: "[HORÁRIO]" },
  { icon: MapPin, label: "Local", valor: "[LOCAL]" },
  { icon: MapPin, label: "Cidade", valor: "[CIDADE – UF]" },
  { icon: BookOpen, label: "Programação", valor: "[PROGRAMAÇÃO]" },
  { icon: Mic, label: "Preletoras", valor: "[PRELETORAS]" },
];

export default function InformacoesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 relative" style={{ background: "#F7F2EA" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="selo mb-4 inline-flex">
            <SmallFlower size={12} color="#B98942" /> Informações
          </span>
          <h2 className="mt-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#3D3A36" }}>
            Detalhes do{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", color: "#59613A" }}>
              Congresso
            </span>
          </h2>
        </motion.div>

        {/* Grid de informações */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {infoItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(185,137,66,0.15)",
                boxShadow: "0 2px 12px rgba(89,97,58,0.05)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(89,97,58,0.08)" }}
              >
                <item.icon size={18} color="#59613A" />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-wider uppercase mb-1"
                  style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-medium"
                  style={{
                    color: item.valor.startsWith("[") ? "#B98942" : "#3D3A36",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    fontStyle: item.valor.startsWith("[") ? "italic" : "normal",
                  }}
                >
                  {item.valor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aviso em breve */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center p-6 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(185,137,66,0.08), rgba(89,97,58,0.05))",
            border: "1px solid rgba(185,137,66,0.2)",
          }}
        >
          <SmallFlower size={24} color="#B98942" className="mx-auto mb-3" />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "#5C5751",
              lineHeight: 1.7,
            }}
          >
            As informações completas sobre a programação e a confirmação das inscrições
            serão divulgadas em breve. Fique atenta aos canais oficiais do DVJ.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12"
        >
          <FloralDivider className="w-full max-w-sm mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
