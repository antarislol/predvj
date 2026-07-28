import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";

export interface AdminData {
  nome: string;
  username: string;
  role: string;
  active: boolean;
}

// Mapeamento de username para email
const USERNAME_MAP: Record<string, string> = {
  kamily: process.env.NEXT_PUBLIC_ADMIN_LOGIN_EMAIL || "kamily@dvj.com.br",
};

export function resolverEmail(username: string): string {
  return USERNAME_MAP[username.toLowerCase()] || username;
}

export async function loginAdmin(username: string, senha: string): Promise<User> {
  const email = resolverEmail(username);
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  return cred.user;
}

export async function verificarAdmin(uid: string): Promise<AdminData | null> {
  const docRef = doc(db, "admins", uid);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data() as AdminData;
  if (data.role !== "admin" || !data.active) return null;
  return data;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
