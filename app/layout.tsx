import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "DVJ — De Volta ao Jardim | Confirmação de presença",
  description:
    "Confirme sua presença para o DVJ — De Volta ao Jardim, um culto DVJ voltado para comunhão, Palavra, presença e propósito.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: ["DVJ", "De Volta ao Jardim", "culto DVJ", "cristão", "confirmação de presença", "evento feminino"],
  authors: [{ name: "DVJ — De Volta ao Jardim" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "DVJ — De Volta ao Jardim | Confirmação de presença",
    description:
      "Confirme sua presença para o DVJ — De Volta ao Jardim, um culto DVJ voltado para comunhão, Palavra, presença e propósito.",
    siteName: "DVJ — De Volta ao Jardim",
  },
  twitter: {
    card: "summary_large_image",
    title: "DVJ — De Volta ao Jardim | Confirmação de presença",
    description:
      "Confirme sua presença para o DVJ — De Volta ao Jardim, um culto DVJ voltado para comunhão, Palavra, presença e propósito.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"} />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
