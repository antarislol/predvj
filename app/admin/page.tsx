"use client";

import { useEffect, useState } from "react";
import { buscarTodasPreInscricoes, PreInscricao } from "@/lib/firebase/firestore";
import { formatarData } from "@/lib/utils/helpers";
import { Users, Calendar, TrendingUp, Building2 } from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";
import { motion } from "framer-motion";

interface Estatisticas {
  total: number;
  hoje: number;
  semana: number;
  mes: number;
  igrejas: number;
  cidadeMaisComum: string;
  ultimas: PreInscricao[];
}

function calcularEstatisticas(dados: PreInscricao[]): Estatisticas {
  const agora = new Date();
  const inicioDia = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const inicioSemana = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

  const paraData = (ts: { seconds: number } | undefined | Date | null) => {
    if (!ts) return new Date(0);
    if (ts instanceof Date) return ts;
    return new Date((ts as { seconds: number }).seconds * 1000);
  };

  const hoje = dados.filter((d) => paraData(d.createdAt) >= inicioDia).length;
  const semana = dados.filter((d) => paraData(d.createdAt) >= inicioSemana).length;
  const mes = dados.filter((d) => paraData(d.createdAt) >= inicioMes).length;

  const igrejas = new Set(dados.map((d) => d.igreja.toLowerCase().trim())).size;

  const cidadesCount: Record<string, number> = {};
  dados.forEach((d) => {
    const c = d.endereco.cidade;
    if (c) cidadesCount[c] = (cidadesCount[c] || 0) + 1;
  });
  const cidadeMaisComum = Object.entries(cidadesCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const ultimas = dados.slice(0, 8);

  return { total: dados.length, hoje, semana, mes, igrejas, cidadeMaisComum, ultimas };
}

export default function AdminDashboard() {
  const [dados, setDados] = useState<PreInscricao[]>([]);
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarTodasPreInscricoes().then((res) => {
      setDados(res);
      setStats(calcularEstatisticas(res));
      setCarregando(false);
    });
  }, []);

  const cards = stats
    ? [
        { label: "Total de confirmações de presença", valor: stats.total, icon: Users, cor: "#59613A" },
        { label: "Hoje", valor: stats.hoje, icon: Calendar, cor: "#B98942" },
        { label: "Últimos 7 dias", valor: stats.semana, icon: TrendingUp, cor: "#BE745B" },
        { label: "Este mês", valor: stats.mes, icon: TrendingUp, cor: "#8D9875" },
        { label: "Igrejas diferentes", valor: stats.igrejas, icon: Building2, cor: "#59613A" },
      ]
    : [];

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#3D3A36" }}>
          Visão Geral
        </h1>
        <p style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}>
          Bem-vinda ao painel do DVJ — De Volta ao Jardim
        </p>
      </div>

      {carregando ? (
        <div className="flex items-center justify-center py-20">
          <SmallFlower size={40} color="#59613A" className="animate-pulse" />
        </div>
      ) : (
        <>
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-5"
                style={{ background: "white", border: "1px solid rgba(185,137,66,0.12)", boxShadow: "0 2px 12px rgba(89,97,58,0.06)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${card.cor}10` }}>
                    <card.icon size={18} color={card.cor} />
                  </div>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#3D3A36", lineHeight: 1 }}>
                  {card.valor}
                </p>
                <p className="mt-1 text-xs" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.4 }}>
                  {card.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Cidade mais comum */}
          {stats && (
            <div className="mb-8 p-5 rounded-2xl" style={{ background: "white", border: "1px solid rgba(185,137,66,0.12)" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#8A8480", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                Cidade com mais cadastros
              </p>
              <p className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36" }}>
                {stats.cidadeMaisComum}
              </p>
            </div>
          )}

          {/* Últimas confirmações de presença */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(185,137,66,0.12)" }}>
            <div className="p-5 border-b" style={{ borderColor: "rgba(185,137,66,0.12)" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#3D3A36" }}>
                Últimas confirmações de presença
              </h2>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(185,137,66,0.08)" }}>
              {stats?.ultimas.map((p) => (
                <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold truncate" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>
                      {p.nomeCompleto}
                    </p>
                    <p className="text-xs truncate" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
                      {p.igreja} · {p.endereco.cidade}/{p.endereco.estado}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs" style={{ color: "#B98942", fontFamily: "'Montserrat', sans-serif" }}>
                      {formatarData(p.createdAt as { seconds: number } | null)}
                    </p>
                    <span
                      className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs"
                      style={{ background: "rgba(89,97,58,0.1)", color: "#59613A", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {p.status === "pre_inscrita" ? "Pré-inscrita" : p.status}
                    </span>
                  </div>
                </div>
              ))}
              {!stats?.ultimas.length && (
                <div className="p-8 text-center">
                  <SmallFlower size={32} color="#8D9875" className="mx-auto mb-2" />
                  <p style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}>
                    Nenhuma confirmação de presença ainda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
