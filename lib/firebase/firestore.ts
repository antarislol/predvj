import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config";

export const COLLECTION_NAME = "pre_inscricoes_dvj";

export interface PreInscricao {
  id?: string;
  nomeCompleto: string;
  telefone: string;
  telefoneNormalizado: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  igreja: string;
  origem?: string;
  observacoes?: string;
  consentimentoPrivacidade: boolean;
  consentimentoComunicacao: boolean;
  status: "pre_inscrita" | "contatada" | "aguardando_confirmacao" | "confirmada" | "desistiu" | "arquivada";
  observacoesAdmin?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Verifica duplicidade por email ou telefone
export async function verificarDuplicidade(email: string, telefone: string): Promise<boolean> {
  const col = collection(db, COLLECTION_NAME);

  const emailQuery = query(col, where("email", "==", email.toLowerCase()));
  const emailSnap = await getDocs(emailQuery);
  if (!emailSnap.empty) return true;

  const telQuery = query(col, where("telefoneNormalizado", "==", telefone));
  const telSnap = await getDocs(telQuery);
  if (!telSnap.empty) return true;

  return false;
}

// Cria nova confirmação de presença
export async function criarPreInscricao(data: Omit<PreInscricao, "id" | "status" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    status: "pre_inscrita",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Busca todas as confirmações de presença (admin)
export async function buscarPreInscricoes(
  filtros?: {
    status?: string;
    cidade?: string;
    estado?: string;
  },
  ordenacao: "asc" | "desc" = "desc",
  limite = 20,
  cursor?: QueryDocumentSnapshot<DocumentData>
) {
  let q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", ordenacao),
    limit(limite)
  );

  if (cursor) {
    q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", ordenacao),
      startAfter(cursor),
      limit(limite)
    );
  }

  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as PreInscricao));
  return { docs, lastDoc: snap.docs[snap.docs.length - 1] };
}

// Busca confirmação de presença por ID
export async function buscarPreInscricaoPorId(id: string): Promise<PreInscricao | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as PreInscricao;
}

// Atualiza status/dados de uma confirmação de presença
export async function atualizarPreInscricao(id: string, data: Partial<PreInscricao>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Conta total de documentos na coleção
export async function contarPreInscricoes(): Promise<number> {
  const snap = await getDocs(collection(db, COLLECTION_NAME));
  return snap.size;
}

// Busca todas para estatísticas (admin)
export async function buscarTodasPreInscricoes(): Promise<PreInscricao[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PreInscricao));
}
