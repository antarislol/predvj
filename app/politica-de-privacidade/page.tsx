import type { Metadata } from "next";
import Link from "next/link";
import { SmallFlower } from "@/components/ui/FloralElements";

export const metadata: Metadata = {
  title: "Política de Privacidade — DVJ | De Volta ao Jardim",
  description: "Conheça como o DVJ — De Volta ao Jardim coleta, utiliza e protege os seus dados pessoais.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen" style={{ background: "#F7F2EA" }}>
      {/* Header simples */}
      <header className="py-6 px-6 border-b" style={{ borderColor: "rgba(185,137,66,0.15)", background: "white" }}>
        <Link href="/" className="flex items-center gap-2">
          <SmallFlower size={24} color="#59613A" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#3E4728" }}>DVJ</span>
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.2rem", color: "#59613A" }}>De Volta ao Jardim</span>
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: "#3D3A36", marginBottom: "0.5rem" }}>
          Política de Privacidade
        </h1>
        <p className="mb-10 text-sm" style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}>
          Última atualização: janeiro de 2026
        </p>

        <div className="prose space-y-8" style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              1. Quem somos
            </h2>
            <p>
              O DVJ — De Volta ao Jardim é um congresso cristão voltado para mulheres. Este site é utilizado exclusivamente
              para a coleta de confirmações de presença e comunicação com as interessadas em participar do evento.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              2. Quais informações coletamos
            </h2>
            <p>Ao realizar sua presença, coletamos as seguintes informações:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Nome completo</li>
              <li>Telefone / WhatsApp</li>
              <li>Endereço de e-mail</li>
              <li>Endereço residencial (CEP, rua, número, bairro, cidade e estado)</li>
              <li>Nome da igreja em que congrega</li>
              <li>Como ficou sabendo do evento (opcional)</li>
              <li>Observações adicionais (opcional)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              3. Por que coletamos essas informações
            </h2>
            <p>
              Os dados são coletados exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Organização e planejamento do congresso DVJ</li>
              <li>Envio de informações sobre as próximas etapas de inscrição</li>
              <li>Comunicação sobre datas, local e programação do evento</li>
              <li>Contato direto com a participante via WhatsApp ou e-mail</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              4. Como utilizamos os dados
            </h2>
            <p>
              Seus dados são utilizados apenas para os fins relacionados ao DVJ — De Volta ao Jardim.
              Não realizamos venda, compartilhamento ou cessão de informações a terceiros para finalidades comerciais
              ou incompatíveis com as descritas nesta política.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              5. Armazenamento e segurança
            </h2>
            <p>
              Os dados são armazenados de forma segura no Firebase Firestore (Google), com autenticação e regras
              de segurança que garantem que apenas pessoas autorizadas da organização possam visualizá-los.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              6. Seus direitos (LGPD)
            </h2>
            <p>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Confirmar a existência do tratamento dos seus dados</li>
              <li>Solicitar a correção ou atualização dos seus dados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#3D3A36", marginBottom: "0.5rem" }}>
              7. Como entrar em contato
            </h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre o uso dos seus dados, entre em contato:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>E-mail: [E-MAIL DE PRIVACIDADE]</li>
              <li>WhatsApp: [WHATSAPP DA ORGANIZAÇÃO]</li>
            </ul>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="btn-secondary inline-flex"
            style={{ textDecoration: "none" }}
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
