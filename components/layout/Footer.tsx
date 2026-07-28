"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";

function InstagramIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative py-14 md:py-16"
      style={{ background: "#F0E8DC", borderTop: "1px solid rgba(185,137,66,0.2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          {/* Logo e descrição */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <SmallFlower size={24} color="#59613A" />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#3E4728" }}>DVJ</span>
            </div>
            <div className="mb-3">
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem", color: "#59613A", lineHeight: 1 }}>
                De Volta ao Jardim
              </span>
            </div>
            <p
              className="text-xs mb-2"
              style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}
            >
              Congresso de Mulheres
            </p>
            <p
              className="text-sm mt-4"
              style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.7 }}
            >
              Um congresso de mulheres para retornar à essência, à presença e ao propósito de Deus.
            </p>
          </div>

          {/* Links de navegação */}
          <div>
            <h4
              className="mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif" }}
            >
              Navegação
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#sobre", label: "Sobre o DVJ" },
                { href: "#congresso", label: "O Congresso" },
                { href: "#pre-inscricao", label: "Pré-inscrição" },
                { href: "#duvidas", label: "Dúvidas" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="text-sm transition-colors hover:text-[#59613A]"
                  style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contato e links */}
          <div>
            <h4
              className="mb-4 text-xs font-bold tracking-widest uppercase"
              style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif" }}
            >
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/dvjconferencia_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#59613A]"
                style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                id="footer-instagram-link"
              >
                <InstagramIcon size={16} color="#BE745B" />
                @dvjconferencia_
              </a>
              <a
                href="https://wa.me/5533984569970"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#59613A]"
                style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                id="footer-whatsapp-link"
              >
                <MessageCircle size={16} color="#59613A" />
                WhatsApp (33) 98456-9970
              </a>
              <a
                href="mailto:kamily@dvj.com.br"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#59613A]"
                style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                id="footer-email-link"
              >
                <Mail size={16} color="#B98942" />
                kamily@dvj.com.br
              </a>
            </div>

            <div className="mt-6 pt-4 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(185,137,66,0.15)" }}>
              <Link
                href="/politica-de-privacidade"
                className="text-xs transition-colors hover:text-[#59613A]"
                style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                id="footer-privacidade-link"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="text-xs transition-colors hover:text-[#59613A]"
                style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif" }}
                id="footer-termos-link"
              >
                Termos de Uso
              </Link>
              {/* Link administrativo discreto */}
              <Link
                href="/admin"
                className="text-xs transition-colors hover:text-[#59613A] mt-2"
                style={{ color: "rgba(138,132,128,0.4)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem" }}
                id="footer-admin-link"
              >
                Acesso administrativo
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 text-center"
          style={{ borderTop: "1px solid rgba(185,137,66,0.15)" }}
        >
          <p
            className="text-xs"
            style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.03em" }}
          >
            © 2026 DVJ — De Volta ao Jardim. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
