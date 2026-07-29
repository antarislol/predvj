"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Loader2, Save, Check } from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";

interface Configuracoes {
  nomeCulto DVJ: string;
  frasePrincipal: string;
  data: string;
  horario: string;
  local: string;
  endereco: string;
  programacao: string;
  instagram: string;
  whatsapp: string;
  email: string;
  mensagemConfirmacao: string;
  limiteInscricoes: number;
  formulariosAtivos: boolean;
  mensagemPausado: string;
}

const CONFIG_DEFAULTS: Configuracoes = {
  nomeCulto DVJ: "DVJ — De Volta ao Jardim",
  frasePrincipal: "Um chamado para retornar à essência, à presença e ao propósito de Deus.",
  data: "15/08/2026",
  horario: "16h",
  local: "Pibaçu Manhuaçu",
  endereco: "",
  programacao: "",
  instagram: "dvjconferencia_",
  whatsapp: "33984569970",
  email: "kamily@dvj.com.br",
  mensagemConfirmacao: "Seus dados foram registrados. Entraremos em contato em breve.",
  limiteInscricoes: 0,
  formulariosAtivos: true,
  mensagemPausado: "As confirmações de presença estão temporariamente indisponíveis. Acompanhe nossos canais oficiais para novas informações.",
};

export default function ConfiguracoesPage() {
  const [config, setConfig] = useState<Configuracoes>(CONFIG_DEFAULTS);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "configuracoes", "dvj");
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        setConfig({ ...CONFIG_DEFAULTS, ...snap.data() as Configuracoes });
      }
      setCarregando(false);
    });
  }, []);

  const handleChange = (campo: keyof Configuracoes, valor: string | boolean | number) => {
    setConfig((prev) => ({ ...prev, [campo]: valor }));
  };

  const salvar = async () => {
    setSalvando(true);
    try {
      await setDoc(doc(db, "configuracoes", "dvj"), { ...config, updatedAt: serverTimestamp() });
      setSalvo(true);
      setTimeout(() => setSalvo(false), 2500);
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SmallFlower size={40} color="#59613A" className="animate-pulse" />
      </div>
    );
  }

  const campos: { key: keyof Configuracoes; label: string; tipo?: string; placeholder?: string; rows?: number }[] = [
    { key: "nomeCulto DVJ", label: "Nome do culto DVJ", placeholder: "DVJ — De Volta ao Jardim" },
    { key: "frasePrincipal", label: "Frase principal", tipo: "textarea", rows: 2, placeholder: "Um chamado para..." },
    { key: "data", label: "Data do evento", placeholder: "Ex: 15 de março de 2026" },
    { key: "horario", label: "Horário", placeholder: "Ex: 8h às 18h" },
    { key: "local", label: "Local / Nome do espaço", placeholder: "Ex: Centro de Convenções..." },
    { key: "endereco", label: "Endereço completo", placeholder: "Rua, número, cidade, UF" },
    { key: "programacao", label: "Programação", tipo: "textarea", rows: 4, placeholder: "Descreva a programação do evento..." },
    { key: "instagram", label: "Instagram (@ ou link)", placeholder: "@dvjculto DVJ" },
    { key: "whatsapp", label: "WhatsApp (só números)", placeholder: "5511999999999" },
    { key: "email", label: "E-mail de contato", placeholder: "contato@dvj.com.br" },
    { key: "mensagemConfirmacao", label: "Mensagem de confirmação após inscrição", tipo: "textarea", rows: 3 },
    { key: "mensagemPausado", label: "Mensagem quando formulário estiver pausado", tipo: "textarea", rows: 2 },
  ];

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8 max-w-2xl">
      <div className="mb-8">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#3D3A36" }}>
          Configurações
        </h1>
        <p className="text-sm mt-1" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
          Gerencie as informações do culto DVJ exibidas no site.
        </p>
      </div>

      <div className="space-y-6">
        {/* Toggle formulário ativo */}
        <div className="p-5 rounded-2xl" style={{ background: "white", border: "1px solid rgba(185,137,66,0.15)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#3D3A36" }}>
                Formulário de confirmação de presença
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
                {config.formulariosAtivos ? "Ativo — aceitando confirmações de presença" : "Pausado — formulário desativado"}
              </p>
            </div>
            <button
              onClick={() => handleChange("formulariosAtivos", !config.formulariosAtivos)}
              className="w-12 h-6 rounded-full relative transition-colors"
              style={{ background: config.formulariosAtivos ? "#59613A" : "#E8DED1" }}
              id="toggle-formulario"
              aria-checked={config.formulariosAtivos}
              role="switch"
            >
              <div
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-transform"
                style={{ transform: config.formulariosAtivos ? "translateX(26px)" : "translateX(2px)" }}
              />
            </button>
          </div>
        </div>

        {/* Limite de inscrições */}
        <div className="p-5 rounded-2xl" style={{ background: "white", border: "1px solid rgba(185,137,66,0.15)" }}>
          <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#5C5751" }}>
            Limite de confirmações de presença (0 = ilimitado)
          </label>
          <input
            type="number"
            min={0}
            className="input-elegant mt-2"
            value={config.limiteInscricoes}
            onChange={(e) => handleChange("limiteInscricoes", Number(e.target.value))}
            id="limite-inscricoes"
          />
        </div>

        {/* Campos de texto */}
        {campos.map(({ key, label, tipo, placeholder, rows }) => (
          <div key={key} className="p-5 rounded-2xl" style={{ background: "white", border: "1px solid rgba(185,137,66,0.15)" }}>
            <label
              htmlFor={`config-${key}`}
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#5C5751" }}
            >
              {label}
            </label>
            {tipo === "textarea" ? (
              <textarea
                id={`config-${key}`}
                rows={rows || 2}
                className="input-elegant mt-2 resize-none"
                value={config[key] as string}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
              />
            ) : (
              <input
                id={`config-${key}`}
                type="text"
                className="input-elegant mt-2"
                value={config[key] as string}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
              />
            )}
          </div>
        ))}
      </div>

      {/* Botão salvar */}
      <div className="mt-8">
        <button
          onClick={salvar}
          disabled={salvando}
          className="btn-primary w-full"
          id="salvar-config-btn"
        >
          {salvando ? <><Loader2 size={16} className="animate-spin" /> Salvando...</> :
           salvo ? <><Check size={16} /> Configurações salvas!</> :
           <><Save size={16} /> Salvar configurações</>}
        </button>
      </div>
    </div>
  );
}
