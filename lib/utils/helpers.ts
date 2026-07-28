// Busca dados do CEP via ViaCEP
export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function buscarCep(cep: string): Promise<EnderecoViaCep | null> {
  const numeros = cep.replace(/\D/g, "");
  if (numeros.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${numeros}/json/`);
    if (!response.ok) return null;
    const data: EnderecoViaCep = await response.json();
    if (data.erro) return null;
    return data;
  } catch {
    return null;
  }
}

// Exporta dados para CSV
export function exportarCSV(dados: Record<string, unknown>[], nomeArquivo: string): void {
  if (!dados.length) return;

  const cabecalho = Object.keys(dados[0]);
  const linhas = dados.map((linha) =>
    cabecalho
      .map((campo) => {
        const valor = linha[campo];
        if (valor === null || valor === undefined) return "";
        const str = String(valor).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(",")
  );

  const csvContent = [cabecalho.join(","), ...linhas].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", nomeArquivo);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Formata data para exibição
export function formatarData(timestamp: { seconds: number } | Date | null | undefined): string {
  if (!timestamp) return "—";
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Pega UTM params da URL
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
  };
}
