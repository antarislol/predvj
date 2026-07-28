import { z } from "zod";

// Máscara de telefone brasileiro
export const formatarTelefone = (valor: string): string => {
  const numeros = valor.replace(/\D/g, "");
  if (numeros.length <= 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};

// Normaliza telefone (apenas números)
export const normalizarTelefone = (valor: string): string => valor.replace(/\D/g, "");

// Valida telefone brasileiro
export const validarTelefone = (valor: string): boolean => {
  const numeros = normalizarTelefone(valor);
  return numeros.length >= 10 && numeros.length <= 11;
};

// Capitaliza nome
export const capitalizarNome = (nome: string): string => {
  const preposicoes = ["da", "de", "di", "do", "du", "das", "dos", "e"];
  return nome
    .trim()
    .split(/\s+/)
    .map((palavra, index) => {
      const lower = palavra.toLowerCase();
      if (index !== 0 && preposicoes.includes(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
};

// Schema de validação com Zod
export const preInscricaoSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(150, "Nome muito longo"),
  telefone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((v) => validarTelefone(v), "Informe um telefone brasileiro válido"),
  email: z
    .string()
    .email("Informe um e-mail válido")
    .max(200, "E-mail muito longo"),
  endereco: z.object({
    cep: z
      .string()
      .min(8, "CEP inválido")
      .max(9, "CEP inválido")
      .regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
    rua: z.string().min(1, "A rua é obrigatória").max(200),
    numero: z.string().min(1, "O número é obrigatório").max(20),
    complemento: z.string().max(100).optional(),
    bairro: z.string().min(1, "O bairro é obrigatório").max(100),
    cidade: z.string().min(1, "A cidade é obrigatória").max(100),
    estado: z.string().min(2, "O estado é obrigatório").max(2),
  }),
  igreja: z.string().min(1, "A igreja é obrigatória").max(200),
  origem: z.string().optional(),
  observacoes: z.string().max(500).optional(),
  consentimentoPrivacidade: z
    .boolean()
    .refine((v) => v === true, "Você deve aceitar a política de privacidade"),
  consentimentoComunicacao: z.boolean().optional(),
});

export type PreInscricaoFormData = z.infer<typeof preInscricaoSchema>;
