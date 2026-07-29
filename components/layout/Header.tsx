"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DVJLogo } from "@/components/ui/FloralElements";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre o DVJ" },
  { href: "#culto DVJ", label: "O Culto DVJ" },
  { href: "#pre-inscricao", label: "Confirmação de presença" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? "rgba(247, 242, 234, 0.97)"
            : "rgba(247, 242, 234, 0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: isScrolled ? "0 2px 20px rgba(89,97,58,0.08)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(185,137,66,0.15)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")} aria-label="DVJ - Ir para o início">
              <DVJLogo size={44} dark />
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Menu principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium transition-colors duration-200 hover:text-[#59613A]"
                  style={{ color: "#5C5751", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.03em" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pre-inscricao"
                onClick={(e) => handleNavClick(e, "#pre-inscricao")}
                className="btn-primary text-sm px-5 py-3"
                style={{ minHeight: "auto", padding: "0.6rem 1.4rem" }}
                id="header-cta-btn"
              >
                Fazer confirmação de presença
              </a>
            </nav>

            {/* Botão mobile */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#59613A" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Abrir menu de navegação"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ top: "64px" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(62,71,40,0.3)" }}
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className="absolute top-0 left-0 right-0 py-6 px-6"
            style={{
              background: "rgba(247, 242, 234, 0.99)",
              borderBottom: "1px solid rgba(185,137,66,0.2)",
            }}
            aria-label="Menu mobile"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-3 px-4 rounded-lg text-base font-medium transition-colors hover:bg-[#E8DED1]"
                  style={{ color: "#3D3A36", fontFamily: "'Montserrat', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t" style={{ borderColor: "rgba(185,137,66,0.2)" }}>
                <a
                  href="#pre-inscricao"
                  onClick={(e) => handleNavClick(e, "#pre-inscricao")}
                  className="btn-primary w-full"
                  id="mobile-cta-btn"
                >
                  Fazer confirmação de presença
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
