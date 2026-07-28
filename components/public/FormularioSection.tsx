"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { preInscricaoSchema, PreInscricaoFormData, formatarTelefone, normalizarTelefone, capitalizarNome } from "@/lib/validations/preInscricao";
import { criarPreInscricao } from "@/lib/firebase/firestore";
import { buscarCep } from "@/lib/utils/helpers";
import { SmallFlower, FloralDivider } from "@/components/ui/FloralElements";

const ESTADOS_BR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO"
];

const ORIGENS = ["Instagram", "WhatsApp", "Igreja", "Amiga ou familiar", "Líder", "Outro"];

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, id, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center text-center">
      <label
        htmlFor={id}
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#5C5751", letterSpacing: "0.04em" }}
      >
        {label} {required && <span style={{ color: "#BE745B" }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs" style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif" }} role="alert">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function FormularioSection() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroDuplicidade, setErroDuplicidade] = useState("");
  const [erroGlobal, setErroGlobal] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PreInscricaoFormData>({
    resolver: zodResolver(preInscricaoSchema),
    defaultValues: {
      consentimentoPrivacidade: false,
      consentimentoComunicacao: false,
    },
  });

  const telefoneValue = watch("telefone");
  const cepValue = watch("endereco.cep");

  // Máscara de telefone
  useEffect(() => {
    if (telefoneValue) {
      const formatado = formatarTelefone(telefoneValue);
      if (formatado !== telefoneValue) {
        setValue("telefone", formatado, { shouldValidate: false });
      }
    }
  }, [telefoneValue, setValue]);

  // Máscara de CEP
  const formatarCep = (valor: string) => {
    const nums = valor.replace(/\D/g, "");
    if (nums.length > 5) return `${nums.slice(0, 5)}-${nums.slice(5, 8)}`;
    return nums;
  };

  // Busca automática de CEP
  const handleCepBlur = useCallback(async () => {
    const cep = cepValue?.replace(/\D/g, "");
    if (!cep || cep.length !== 8) return;

    setBuscandoCep(true);
    try {
      const dados = await buscarCep(cep);
      if (dados) {
        setValue("endereco.rua", dados.logradouro || "", { shouldValidate: true });
        setValue("endereco.bairro", dados.bairro || "", { shouldValidate: true });
        setValue("endereco.cidade", dados.localidade || "", { shouldValidate: true });
        setValue("endereco.estado", dados.uf || "", { shouldValidate: true });
      }
    } finally {
      setBuscandoCep(false);
    }
  }, [cepValue, setValue]);

  const onSubmit = async (data: PreInscricaoFormData) => {
    setEnviando(true);
    setErroDuplicidade("");
    setErroGlobal("");

    try {
      const telefoneNorm = normalizarTelefone(data.telefone);
      const emailNorm = data.email.toLowerCase().trim();

      // UTM params
      const utmParams: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((key) => {
          const val = params.get(key);
          if (val) utmParams[key.replace("utm_", "")] = val;
        });
      }

      // Salvar no Firestore
      await criarPreInscricao({
        nomeCompleto: capitalizarNome(data.nomeCompleto),
        telefone: data.telefone,
        telefoneNormalizado: telefoneNorm,
        email: emailNorm,
        endereco: {
          cep: data.endereco.cep.replace(/\D/g, ""),
          rua: data.endereco.rua.trim(),
          numero: data.endereco.numero.trim(),
          complemento: data.endereco.complemento?.trim() || "",
          bairro: data.endereco.bairro.trim(),
          cidade: data.endereco.cidade.trim(),
          estado: data.endereco.estado.toUpperCase(),
        },
        igreja: data.igreja.trim(),
        origem: data.origem || "",
        observacoes: data.observacoes?.trim() || "",
        consentimentoPrivacidade: data.consentimentoPrivacidade,
        consentimentoComunicacao: data.consentimentoComunicacao || false,
        ...(Object.keys(utmParams).length > 0 && { utm: utmParams }),
      });

      setEnviado(true);
      reset();
      // Scroll para o topo do formulário
      window.scrollTo({ top: document.querySelector("#pre-inscricao")?.getBoundingClientRect().top! + window.scrollY - 80, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setErroGlobal("Ocorreu um erro ao enviar sua presença. Por favor, tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return <ConfirmacaoEnviada />;
  }

  return (
    <section id="pre-inscricao" className="py-20 md:py-28 relative" style={{ background: "#F7F2EA" }}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="selo mb-4 inline-flex">
            <SmallFlower size={12} color="#B98942" /> Confirmação de presença
          </span>
          <h2 className="mt-4 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#3D3A36" }}>
            Faça sua{" "}
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#59613A" }}>
              confirmação de presença.
            </span>
          </h2>
          <p style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Preencha seus dados para receber as próximas informações do DVJ — De Volta ao Jardim.
          </p>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="rounded-3xl p-6 md:p-10"
            style={{
              background: "white",
              border: "1px solid rgba(185,137,66,0.15)",
              boxShadow: "0 20px 60px rgba(89,97,58,0.08)",
            }}
          >
            {erroDuplicidade && (
              <div className="mb-6 p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(190,116,91,0.08)", border: "1px solid rgba(190,116,91,0.25)" }}>
                <AlertCircle size={18} color="#BE745B" className="flex-shrink-0 mt-0.5" />
                <p style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {erroDuplicidade}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-center mx-auto max-w-xl" noValidate>
              {/* Dados pessoais */}
              <div className="mb-8">
                <h3 className="mb-5 pb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#3D3A36", borderBottom: "1px solid rgba(185,137,66,0.2)" }}>
                  Dados Pessoais
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <FormField label="Nome completo" id="nomeCompleto" error={errors.nomeCompleto?.message} required>
                      <input
                        id="nomeCompleto"
                        type="text"
                        autoComplete="name"
                        className={`input-elegant ${errors.nomeCompleto ? "error" : ""}`}
                        placeholder="Seu nome completo"
                        {...register("nomeCompleto")}
                      />
                    </FormField>
                  </div>
                  <FormField label="Telefone / WhatsApp" id="telefone" error={errors.telefone?.message} required>
                    <input
                      id="telefone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      className={`input-elegant ${errors.telefone ? "error" : ""}`}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      {...register("telefone", {
                        onChange: (e) => {
                          e.target.value = formatarTelefone(e.target.value);
                        },
                      })}
                    />
                  </FormField>
                  <FormField label="E-mail" id="email" error={errors.email?.message} required>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={`input-elegant ${errors.email ? "error" : ""}`}
                      placeholder="seu@email.com"
                      {...register("email")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Endereço */}
              <div className="mb-8">
                <h3 className="mb-5 pb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#3D3A36", borderBottom: "1px solid rgba(185,137,66,0.2)" }}>
                  Endereço
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* CEP */}
                  <FormField label="CEP" id="cep" error={errors.endereco?.cep?.message} required>
                    <div className="relative">
                      <input
                        id="cep"
                        type="text"
                        inputMode="numeric"
                        className={`input-elegant ${errors.endereco?.cep ? "error" : ""}`}
                        placeholder="00000-000"
                        maxLength={9}
                        {...register("endereco.cep", {
                          onChange: (e) => {
                            e.target.value = formatarCep(e.target.value);
                          },
                          onBlur: handleCepBlur,
                        })}
                      />
                      {buscandoCep && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Loader2 size={16} color="#59613A" className="animate-spin" />
                        </div>
                      )}
                    </div>
                  </FormField>

                  {/* Estado */}
                  <FormField label="Estado" id="estado" error={errors.endereco?.estado?.message} required>
                    <div className="relative">
                      <select
                        id="estado"
                        className={`input-elegant appearance-none ${errors.endereco?.estado ? "error" : ""}`}
                        {...register("endereco.estado")}
                      >
                        <option value="">Selecione</option>
                        {ESTADOS_BR.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#8A8480" }} />
                    </div>
                  </FormField>

                  {/* Rua */}
                  <div className="sm:col-span-2">
                    <FormField label="Rua / Logradouro" id="rua" error={errors.endereco?.rua?.message} required>
                      <input
                        id="rua"
                        type="text"
                        autoComplete="street-address"
                        className={`input-elegant ${errors.endereco?.rua ? "error" : ""}`}
                        placeholder="Nome da rua, avenida..."
                        {...register("endereco.rua")}
                      />
                    </FormField>
                  </div>

                  {/* Número e Complemento */}
                  <FormField label="Número" id="numero" error={errors.endereco?.numero?.message} required>
                    <input
                      id="numero"
                      type="text"
                      className={`input-elegant ${errors.endereco?.numero ? "error" : ""}`}
                      placeholder="Ex: 123"
                      {...register("endereco.numero")}
                    />
                  </FormField>
                  <FormField label="Complemento" id="complemento">
                    <input
                      id="complemento"
                      type="text"
                      className="input-elegant"
                      placeholder="Apto, bloco... (opcional)"
                      {...register("endereco.complemento")}
                    />
                  </FormField>

                  {/* Bairro e Cidade */}
                  <FormField label="Bairro" id="bairro" error={errors.endereco?.bairro?.message} required>
                    <input
                      id="bairro"
                      type="text"
                      className={`input-elegant ${errors.endereco?.bairro ? "error" : ""}`}
                      placeholder="Seu bairro"
                      {...register("endereco.bairro")}
                    />
                  </FormField>
                  <FormField label="Cidade" id="cidade" error={errors.endereco?.cidade?.message} required>
                    <input
                      id="cidade"
                      type="text"
                      className={`input-elegant ${errors.endereco?.cidade ? "error" : ""}`}
                      placeholder="Sua cidade"
                      {...register("endereco.cidade")}
                    />
                  </FormField>
                </div>
              </div>

              {/* Igreja e Como soube */}
              <div className="mb-8">
                <h3 className="mb-5 pb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#3D3A36", borderBottom: "1px solid rgba(185,137,66,0.2)" }}>
                  Informações Adicionais
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <FormField label="Igreja em que congrega" id="igreja" error={errors.igreja?.message} required>
                      <input
                        id="igreja"
                        type="text"
                        className={`input-elegant ${errors.igreja ? "error" : ""}`}
                        placeholder="Nome da sua igreja"
                        {...register("igreja")}
                      />
                    </FormField>
                  </div>
                  <div className="sm:col-span-2">
                    <FormField label="Como ficou sabendo do DVJ?" id="origem">
                      <div className="relative">
                        <select id="origem" className="input-elegant appearance-none" {...register("origem")}>
                          <option value="">Selecione (opcional)</option>
                          {ORIGENS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#8A8480" }} />
                      </div>
                    </FormField>
                  </div>
                  <div className="sm:col-span-2">
                    <FormField label="Observações" id="observacoes">
                      <textarea
                        id="observacoes"
                        rows={3}
                        className="input-elegant resize-none"
                        placeholder="Alguma informação adicional? (opcional)"
                        {...register("observacoes")}
                      />
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="mb-8 space-y-4">
                {/* Consentimento obrigatório */}
                <div>
                  <label className="flex flex-col items-center text-center gap-3 cursor-pointer group">
                    <input
                      id="consentimentoPrivacidade"
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded flex-shrink-0 cursor-pointer"
                      style={{ accentColor: "#59613A" }}
                      {...register("consentimentoPrivacidade")}
                    />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#5C5751", lineHeight: 1.6 }}>
                      Declaro que as informações fornecidas são verdadeiras e autorizo o uso dos meus dados para contato e organização do congresso, conforme a{" "}
                      <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" style={{ color: "#59613A", textDecoration: "underline" }}>
                        Política de Privacidade
                      </a>.{" "}
                      <span style={{ color: "#BE745B" }}>*</span>
                    </span>
                  </label>
                  {errors.consentimentoPrivacidade && (
                    <p className="flex justify-center items-center gap-1.5 mt-2 text-xs" style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif" }} role="alert">
                      <AlertCircle size={12} /> {errors.consentimentoPrivacidade.message}
                    </p>
                  )}
                </div>

                {/* Consentimento comunicação (opcional) */}
                <label className="flex flex-col items-center text-center gap-3 cursor-pointer">
                  <input
                    id="consentimentoComunicacao"
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded flex-shrink-0 cursor-pointer"
                    style={{ accentColor: "#59613A" }}
                    {...register("consentimentoComunicacao")}
                  />
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#5C5751", lineHeight: 1.6 }}>
                    Quero receber novidades e informações sobre o DVJ pelo WhatsApp e pelo e-mail. (opcional)
                  </span>
                </label>
              </div>

              {/* Erro global */}
              {erroGlobal && (
                <div className="mb-6 p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(190,116,91,0.08)", border: "1px solid rgba(190,116,91,0.25)" }}>
                  <AlertCircle size={18} color="#BE745B" className="flex-shrink-0 mt-0.5" />
                  <p style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}>{erroGlobal}</p>
                </div>
              )}

              {/* Botão de envio */}
              <button
                type="submit"
                disabled={enviando}
                className="btn-primary w-full text-base"
                id="form-submit-btn"
              >
                {enviando ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  "✦ ENVIAR MINHA PRÉ-INSCRIÇÃO"
                )}
              </button>

              <p className="mt-4 text-center text-xs" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
                Esta confirmação de presença ainda não confirma sua vaga no congresso.
              </p>
            </form>
          </div>
        </motion.div>

        <div className="mt-12">
          <FloralDivider className="w-full max-w-sm mx-auto" />
        </div>
      </div>
    </section>
  );
}

function ConfirmacaoEnviada() {
  return (
    <section id="pre-inscricao" className="py-20 md:py-28 relative" style={{ background: "#F7F2EA" }}>
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center rounded-3xl p-10 md:p-14"
          style={{ background: "white", border: "1px solid rgba(185,137,66,0.2)", boxShadow: "0 20px 60px rgba(89,97,58,0.1)" }}
        >
          {/* Ícone de sucesso */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(89,97,58,0.1)" }}>
              <CheckCircle2 size={40} color="#59613A" />
            </div>
          </div>

          <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 600, color: "#3D3A36" }}>
            Sua presença foi recebida! 🌿
          </h2>

          <p className="mb-3" style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Ficamos felizes em saber que você deseja viver esse momento conosco.
          </p>
          <p className="mb-6" style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Seus dados foram registrados e a equipe do DVJ entrará em contato quando as
            próximas etapas da inscrição forem liberadas.
          </p>

          <div className="mb-8 p-4 rounded-xl" style={{ background: "rgba(185,137,66,0.08)", border: "1px solid rgba(185,137,66,0.2)" }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: "#B98942", fontWeight: 600 }}>
              ⚠️ Esta confirmação de presença ainda não confirma sua vaga no congresso.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-primary"
              id="success-voltar-btn"
            >
              Voltar para o início
            </button>
            <a
              href="https://instagram.com/[INSTAGRAM DO DVJ]"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              id="success-instagram-btn"
            >
              Acompanhar no Instagram
            </a>
            <a
              href="https://wa.me/[WHATSAPP DA ORGANIZAÇÃO]"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              id="success-whatsapp-btn"
            >
              Falar com a Organização
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
