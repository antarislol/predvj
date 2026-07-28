"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { loginAdmin, verificarAdmin } from "@/lib/firebase/auth";
import { SmallFlower } from "@/components/ui/FloralElements";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const user = await loginAdmin(username.trim(), senha);
      const adminData = await verificarAdmin(user.uid);

      if (!adminData) {
        setErro("Admin data not found. UID: " + user.uid);
        // Faz logout imediatamente
        const { signOut } = await import("@/lib/firebase/auth");
        await signOut();
        return;
      }

      router.push("/admin");
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/wrong-password" ||
        firebaseError.code === "auth/user-not-found"
      ) {
        setErro("Usuário ou senha incorretos.");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setErro("Muitas tentativas de acesso. Tente novamente mais tarde.");
      } else {
        setErro(`Erro: ${firebaseError.code || firebaseError.message || JSON.stringify(error)}`);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #F7F2EA 0%, #EDE0D4 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: "white",
            boxShadow: "0 20px 60px rgba(89,97,58,0.12)",
            border: "1px solid rgba(185,137,66,0.15)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <SmallFlower size={40} color="#59613A" />
            </div>
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.8rem", color: "#3E4728" }}
            >
              DVJ
            </span>
            <div>
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.4rem", color: "#59613A" }}>
                De Volta ao Jardim
              </span>
            </div>
            <p
              className="mt-3 text-sm"
              style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
            >
              Área administrativa
            </p>
          </div>

          {/* Linha decorativa */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, #B98942, transparent)" }} />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              {/* Usuário */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="admin-username"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#5C5751" }}
                >
                  Usuário
                </label>
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  className="input-elegant"
                  placeholder="Seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={carregando}
                  required
                />
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="admin-senha"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#5C5751" }}
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="admin-senha"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete="current-password"
                    className="input-elegant pr-12"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={carregando}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    style={{ color: "#8A8480" }}
                  >
                    {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {erro && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "rgba(190,116,91,0.08)", border: "1px solid rgba(190,116,91,0.2)" }}>
                  <AlertCircle size={16} color="#BE745B" className="flex-shrink-0 mt-0.5" />
                  <p style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", lineHeight: 1.5 }}>
                    {erro}
                  </p>
                </div>
              )}

              {/* Botão */}
              <button
                type="submit"
                disabled={carregando || !username || !senha}
                className="btn-primary w-full mt-2"
                id="admin-login-btn"
              >
                {carregando ? (
                  <><Loader2 size={18} className="animate-spin" /> Entrando...</>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
