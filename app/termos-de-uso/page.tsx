import type { Metadata } from "next";
import Link from "next/link";
import { SmallFlower } from "@/components/ui/FloralElements";

export const metadata: Metadata = {
  title: "Termos de Uso — DVJ | De Volta ao Jardim",
  description: "Leia os termos de uso do site DVJ — De Volta ao Jardim.",
};

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F2EA" }}>
      <header className="py-6 px-6 border-b" style={{ borderColor: "rgba(185,137,66,0.15)", background: "white" }}>
        <Link href="/" className="flex items-center gap-2">
          <SmallFlower size={24} color="#59613A" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#3E4728" }}>DVJ</span>
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.2rem", color: "#59613A" }}>De Volta ao Jardim</span>
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: "#3D3A36", marginBottom: "0.5rem" }}>
          Termos de Uso
        </h1>
        <p className="mb-10 text-sm" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
          Última atualização: janeiro de 2026
        </p>

        <div className="space-y-8" style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              1. Sobre este site
            </h2>
            <p>
              Este site tem como finalidade exclusiva a realização de confirmações de presença para o DVJ — De Volta ao Jardim,
              um culto DVJ cristão voltado para mulheres.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              2. Confirmação de presença
            </h2>
            <p>
              A confirmação de presença realizada por meio deste site não garante vaga no culto DVJ.
              Ela representa apenas a manifestação de interesse em participar do evento.
              A confirmação da inscrição dependerá das etapas a serem divulgadas pela organização.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              3. Veracidade das informações
            </h2>
            <p>
              Ao se pré-inscrever, a participante declara que todas as informações fornecidas são
              verdadeiras. O fornecimento de dados falsos pode resultar na exclusão da confirmação de presença.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              4. Uso adequado
            </h2>
            <p>
              É proibido utilizar este site para qualquer finalidade ilegal, fraudulenta ou que contrarie
              os valores cristãos do DVJ. A organização reserva o direito de cancelar qualquer
              confirmação de presença que viole esses termos.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              5. Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo deste site — incluindo textos, imagens, logotipo e identidade visual —
              é de propriedade do DVJ — De Volta ao Jardim e está protegido por direitos autorais.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              6. Alterações
            </h2>
            <p>
              A organização reserva o direito de alterar estes termos a qualquer momento.
              A versão atualizada será publicada nesta página.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              7. Contato
            </h2>
            <p>
              Em caso de dúvidas, entre em contato:
              WhatsApp: [WHATSAPP DA ORGANIZAÇÃO] | E-mail: [E-MAIL DE CONTATO]
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="btn-secondary inline-flex" style={{ textDecoration: "none" }}>
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
