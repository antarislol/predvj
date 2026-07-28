"use client";

import { useEffect, useState, useCallback } from "react";
import { buscarTodasPreInscricoes, atualizarPreInscricao, PreInscricao } from "@/lib/firebase/firestore";
import { formatarData, exportarCSV } from "@/lib/utils/helpers";
import { Search, Download, Eye, Phone, Mail, MessageCircle, ChevronDown, X, Check, Loader2 } from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_LABELS: Record<string, string> = {
  pre_inscrita: "Pré-inscrita",
  contatada: "Contatada",
  aguardando_confirmacao: "Aguardando confirmação",
  confirmada: "Confirmada",
  desistiu: "Desistiu",
  arquivada: "Arquivada",
};

const STATUS_CORES: Record<string, { bg: string; text: string }> = {
  pre_inscrita: { bg: "rgba(89,97,58,0.1)", text: "#59613A" },
  contatada: { bg: "rgba(185,137,66,0.1)", text: "#B98942" },
  aguardando_confirmacao: { bg: "rgba(141,152,117,0.15)", text: "#8D9875" },
  confirmada: { bg: "rgba(89,97,58,0.15)", text: "#3E4728" },
  desistiu: { bg: "rgba(190,116,91,0.1)", text: "#BE745B" },
  arquivada: { bg: "rgba(138,132,128,0.1)", text: "#8A8480" },
};

function copiarTexto(texto: string) {
  navigator.clipboard.writeText(texto);
}

interface ModalProps {
  inscricao: PreInscricao;
  onClose: () => void;
  onAtualizar: (id: string, dados: Partial<PreInscricao>) => void;
}

function ModalInscricao({ inscricao, onClose, onAtualizar }: ModalProps) {
  const [novoStatus, setNovoStatus] = useState(inscricao.status);
  const [obsAdmin, setObsAdmin] = useState(inscricao.observacoesAdmin || "");
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const salvarAlteracoes = async () => {
    setSalvando(true);
    await onAtualizar(inscricao.id!, { status: novoStatus as PreInscricao["status"], observacoesAdmin: obsAdmin });
    setSalvando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ background: "white", boxShadow: "0 30px 80px rgba(62,71,40,0.2)" }}
      >
        {/* Header do modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b" style={{ background: "white", borderColor: "rgba(185,137,66,0.15)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "#3D3A36" }}>
            {inscricao.nomeCompleto}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100" aria-label="Fechar">
            <X size={20} color="#8A8480" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contato */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone size={16} color="#59613A" />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>{inscricao.telefone}</span>
                <button onClick={() => copiarTexto(inscricao.telefone)} className="text-xs px-2 py-1 rounded-lg hover:bg-gray-100" style={{ color: "#8A8480" }}>Copiar</button>
                <a href={`https://wa.me/55${inscricao.telefoneNormalizado}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(89,97,58,0.1)", color: "#59613A" }}>
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} color="#B98942" />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>{inscricao.email}</span>
                <a href={`mailto:${inscricao.email}`} className="text-xs px-2 py-1 rounded-lg hover:bg-gray-100" style={{ color: "#8A8480" }}>Enviar e-mail</a>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Endereço</h3>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36", lineHeight: 1.6 }}>
              {inscricao.endereco.rua}, {inscricao.endereco.numero}
              {inscricao.endereco.complemento && `, ${inscricao.endereco.complemento}`}<br />
              {inscricao.endereco.bairro} — {inscricao.endereco.cidade}/{inscricao.endereco.estado}<br />
              CEP: {inscricao.endereco.cep}
            </p>
          </div>

          {/* Igreja e origem */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Igreja</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>{inscricao.igreja}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Como soube</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>{inscricao.origem || "—"}</p>
            </div>
          </div>

          {/* Observações da participante */}
          {inscricao.observacoes && (
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Observações (participante)</h3>
              <p className="p-3 rounded-xl" style={{ background: "#F7F2EA", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>
                {inscricao.observacoes}
              </p>
            </div>
          )}

          {/* Status */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Status</h3>
            <div className="relative">
              <select
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value as PreInscricao["status"])}
                className="input-elegant appearance-none pr-10"
                id={`status-modal-${inscricao.id}`}
              >
                {Object.entries(STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#8A8480" }} />
            </div>
          </div>

          {/* Observações admin */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>Observações internas (visíveis apenas para a equipe)</h3>
            <textarea
              value={obsAdmin}
              onChange={(e) => setObsAdmin(e.target.value)}
              rows={3}
              className="input-elegant resize-none"
              placeholder="Adicione observações internas..."
              id={`obs-admin-${inscricao.id}`}
            />
          </div>

          {/* Data */}
          <p className="text-xs" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
            Cadastrada em: {formatarData(inscricao.createdAt as { seconds: number } | null)}
          </p>

          {/* Botão salvar */}
          <button
            onClick={salvarAlteracoes}
            disabled={salvando}
            className="btn-primary w-full"
            id={`salvar-modal-${inscricao.id}`}
          >
            {salvando ? <><Loader2 size={16} className="animate-spin" /> Salvando...</> :
             salvo ? <><Check size={16} /> Salvo!</> : "Salvar alterações"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function PreInscricoesPage() {
  const [dados, setDados] = useState<PreInscricao[]>([]);
  const [filtrados, setFiltrados] = useState<PreInscricao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [inscricaoSelecionada, setInscricaoSelecionada] = useState<PreInscricao | null>(null);
  const [pagina, setPagina] = useState(1);
  const POR_PAGINA = 20;

  useEffect(() => {
    buscarTodasPreInscricoes().then((res) => {
      setDados(res);
      setFiltrados(res);
      setCarregando(false);
    });
  }, []);

  const aplicarFiltros = useCallback(() => {
    let res = [...dados];
    if (busca.trim()) {
      const b = busca.toLowerCase();
      res = res.filter((d) =>
        d.nomeCompleto.toLowerCase().includes(b) ||
        d.telefone.includes(b) ||
        d.email.toLowerCase().includes(b) ||
        d.igreja.toLowerCase().includes(b) ||
        d.endereco.cidade.toLowerCase().includes(b)
      );
    }
    if (filtroStatus) res = res.filter((d) => d.status === filtroStatus);
    setFiltrados(res);
    setPagina(1);
  }, [dados, busca, filtroStatus]);

  useEffect(() => { aplicarFiltros(); }, [aplicarFiltros]);

  const handleAtualizar = async (id: string, upd: Partial<PreInscricao>) => {
    await atualizarPreInscricao(id, upd);
    setDados((prev) => prev.map((d) => (d.id === id ? { ...d, ...upd } : d)));
    if (inscricaoSelecionada?.id === id) {
      setInscricaoSelecionada((prev) => prev ? { ...prev, ...upd } : prev);
    }
  };

  const handleExportar = () => {
    const csvData = filtrados.map((d) => ({
      Nome: d.nomeCompleto,
      Telefone: d.telefone,
      Email: d.email,
      CEP: d.endereco.cep,
      Rua: d.endereco.rua,
      Numero: d.endereco.numero,
      Complemento: d.endereco.complemento || "",
      Bairro: d.endereco.bairro,
      Cidade: d.endereco.cidade,
      Estado: d.endereco.estado,
      Igreja: d.igreja,
      "Como soube": d.origem || "",
      Observacoes: d.observacoes || "",
      Consentimento: d.consentimentoPrivacidade ? "Sim" : "Não",
      Status: STATUS_LABELS[d.status] || d.status,
      "Data de pré-inscrição": formatarData(d.createdAt as { seconds: number } | null),
    }));
    const hoje = new Date().toISOString().split("T")[0];
    exportarCSV(csvData, `pre-inscricoes-dvj-${hoje}.csv`);
  };

  const inicio = (pagina - 1) * POR_PAGINA;
  const paginados = filtrados.slice(inicio, inicio + POR_PAGINA);
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#3D3A36" }}>
            Pré-inscrições
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
            {filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={handleExportar} className="btn-secondary text-xs px-5 py-2.5 flex items-center gap-2" style={{ minHeight: "auto" }} id="export-csv-btn">
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8480" }} />
          <input
            type="text"
            placeholder="Buscar por nome, telefone, e-mail, igreja, cidade..."
            className="input-elegant pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            id="busca-inscricoes"
          />
        </div>
        <div className="relative sm:w-48">
          <select
            className="input-elegant appearance-none pr-8"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            id="filtro-status"
          >
            <option value="">Todos os status</option>
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#8A8480" }} />
        </div>
      </div>

      {/* Tabela */}
      {carregando ? (
        <div className="flex items-center justify-center py-20">
          <SmallFlower size={40} color="#59613A" className="animate-pulse" />
        </div>
      ) : (
        <>
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(185,137,66,0.12)" }}>
            {/* Mobile: cards */}
            <div className="md:hidden divide-y" style={{ borderColor: "rgba(185,137,66,0.08)" }}>
              {paginados.map((p) => (
                <div key={p.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36" }}>{p.nomeCompleto}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>{p.telefone}</p>
                      <p className="text-xs" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>{p.email}</p>
                      <p className="text-xs mt-1" style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif" }}>{p.igreja} · {p.endereco.cidade}/{p.endereco.estado}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: STATUS_CORES[p.status]?.bg, color: STATUS_CORES[p.status]?.text, fontFamily: "'Montserrat', sans-serif" }}>
                        {STATUS_LABELS[p.status]}
                      </span>
                      <button onClick={() => setInscricaoSelecionada(p)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(89,97,58,0.08)", color: "#59613A" }} id={`ver-${p.id}`}>
                        <Eye size={12} /> Ver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: tabela */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#F7F2EA", borderBottom: "1px solid rgba(185,137,66,0.12)" }}>
                    {["Nome", "Telefone", "E-mail", "Igreja", "Cidade", "Data", "Status", ""].map((col) => (
                      <th key={col} className="px-4 py-3 text-left text-xs font-bold tracking-wider" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase" }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "rgba(185,137,66,0.06)" }}>
                  {paginados.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F2EA] transition-colors">
                      <td className="px-4 py-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", color: "#3D3A36", fontWeight: 500 }}>{p.nomeCompleto}</td>
                      <td className="px-4 py-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#5C5751" }}>{p.telefone}</td>
                      <td className="px-4 py-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#5C5751" }}>{p.email}</td>
                      <td className="px-4 py-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#5C5751" }}>{p.igreja}</td>
                      <td className="px-4 py-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#5C5751" }}>{p.endereco.cidade}/{p.endereco.estado}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#B98942" }}>{formatarData(p.createdAt as { seconds: number } | null)}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs whitespace-nowrap" style={{ background: STATUS_CORES[p.status]?.bg, color: STATUS_CORES[p.status]?.text, fontFamily: "'Montserrat', sans-serif" }}>
                          {STATUS_LABELS[p.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setInscricaoSelecionada(p)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[#E8DED1]" style={{ color: "#59613A" }} id={`ver-desktop-${p.id}`}>
                          <Eye size={14} /> Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Estado vazio */}
            {!paginados.length && (
              <div className="p-12 text-center">
                <SmallFlower size={36} color="#8D9875" className="mx-auto mb-3" />
                <p style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}>
                  Nenhuma pré-inscrição encontrada.
                </p>
              </div>
            )}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
                className="px-4 py-2 rounded-xl text-sm disabled:opacity-40"
                style={{ background: "white", border: "1px solid rgba(185,137,66,0.2)", color: "#59613A", fontFamily: "'Montserrat', sans-serif" }}
              >
                ← Anterior
              </button>
              <span className="text-sm px-4" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
                {pagina} / {totalPaginas}
              </span>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                className="px-4 py-2 rounded-xl text-sm disabled:opacity-40"
                style={{ background: "white", border: "1px solid rgba(185,137,66,0.2)", color: "#59613A", fontFamily: "'Montserrat', sans-serif" }}
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {inscricaoSelecionada && (
          <ModalInscricao
            inscricao={inscricaoSelecionada}
            onClose={() => setInscricaoSelecionada(null)}
            onAtualizar={handleAtualizar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
