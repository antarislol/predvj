"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/firebase/auth";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { SmallFlower } from "@/components/ui/FloralElements";

const menuItems = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/pre-inscricoes", label: "Confirmações de presença", icon: Users },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    if (!loading && pathname !== "/admin/login") {
      if (!user) {
        router.replace("/admin/login");
      } else if (!isAdmin) {
        signOut().then(() => router.replace("/admin/login"));
      }
    }
  }, [user, isAdmin, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F2EA" }}>
        <div className="text-center">
          <SmallFlower size={40} color="#59613A" className="mx-auto mb-4 animate-pulse" />
          <p style={{ color: "#8A8480", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}>
            Verificando acesso...
          </p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!user || !isAdmin) return null;

  const handleLogout = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F7F2EA" }}>
      {/* Sidebar Desktop */}
      <aside
        className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-30"
        style={{
          background: "white",
          borderRight: "1px solid rgba(185,137,66,0.15)",
          boxShadow: "2px 0 20px rgba(89,97,58,0.06)",
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "rgba(185,137,66,0.15)" }}>
          <div className="flex items-center gap-2 mb-1">
            <SmallFlower size={22} color="#59613A" />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", color: "#3E4728" }}>DVJ — Admin</span>
          </div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", color: "#8A8480" }}>
            De Volta ao Jardim
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const ativo = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  background: ativo ? "rgba(89,97,58,0.08)" : "transparent",
                  color: ativo ? "#3E4728" : "#8A8480",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: ativo ? 600 : 400,
                  borderLeft: ativo ? "3px solid #59613A" : "3px solid transparent",
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: "rgba(185,137,66,0.15)" }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all hover:bg-red-50"
            style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}
            id="admin-logout-btn"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "white", boxShadow: "0 2px 12px rgba(89,97,58,0.15)", color: "#59613A" }}
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Abrir menu"
      >
        {menuAberto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuAberto && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMenuAberto(false)} />
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 flex flex-col"
            style={{ background: "white", boxShadow: "4px 0 20px rgba(89,97,58,0.15)" }}
          >
            <div className="p-6 border-b pt-16" style={{ borderColor: "rgba(185,137,66,0.15)" }}>
              <div className="flex items-center gap-2">
                <SmallFlower size={22} color="#59613A" />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", color: "#3E4728" }}>DVJ — Admin</span>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const ativo = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuAberto(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: ativo ? "rgba(89,97,58,0.08)" : "transparent",
                      color: ativo ? "#3E4728" : "#8A8480",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: ativo ? 600 : 400,
                    }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t" style={{ borderColor: "rgba(185,137,66,0.15)" }}>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-50"
                style={{ color: "#BE745B", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
