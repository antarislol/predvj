/**
 * Script de setup automático do DVJ no Firebase
 * - Cria a conta da Kamily no Firebase Auth
 * - Cria o documento de admin no Firestore
 */

const API_KEY = "AIzaSyCE-_tyEr9B5iPksMXoi_bcJTz7cumqlWQ";
const PROJECT_ID = "antarisflow";
const ADMIN_EMAIL = "kamily@dvj.com.br";
const ADMIN_PASSWORD = "kamily123";

async function criarUsuario() {
  console.log("📧 Criando conta no Firebase Auth...");
  
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        returnSecureToken: true,
      }),
    }
  );

  const data = await res.json();

  if (data.error) {
    if (data.error.message === "EMAIL_EXISTS") {
      console.log("⚠️  E-mail já existe. Fazendo login para obter o UID...");
      return await fazerLogin();
    }
    throw new Error(`Erro ao criar usuário: ${data.error.message}`);
  }

  console.log(`✅ Usuário criado! UID: ${data.localId}`);
  return { uid: data.localId, idToken: data.idToken };
}

async function fazerLogin() {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        returnSecureToken: true,
      }),
    }
  );

  const data = await res.json();
  if (data.error) throw new Error(`Erro no login: ${data.error.message}`);
  
  console.log(`✅ Login realizado. UID: ${data.localId}`);
  return { uid: data.localId, idToken: data.idToken };
}

async function criarDocumentoAdmin(uid, idToken) {
  console.log(`\n📄 Criando documento admins/${uid} no Firestore...`);

  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/admins/${uid}`;

  const body = {
    fields: {
      nome: { stringValue: "Kamily" },
      username: { stringValue: "kamily" },
      role: { stringValue: "admin" },
      active: { booleanValue: true },
      createdAt: { timestampValue: new Date().toISOString() },
    },
  };

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(`Erro ao criar documento: ${JSON.stringify(data.error)}`);
  }

  console.log(`✅ Documento admin criado com sucesso!`);
  return data;
}

async function main() {
  try {
    console.log("🌿 DVJ — Setup automático do Firebase\n");

    const { uid, idToken } = await criarUsuario();
    await criarDocumentoAdmin(uid, idToken);

    console.log("\n🎉 Setup concluído com sucesso!");
    console.log(`\n📋 Resumo:`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Senha: ${ADMIN_PASSWORD}`);
    console.log(`   UID:   ${uid}`);
    console.log(`\n   Login: /admin → usuário "kamily" → senha "kamily123"`);
  } catch (err) {
    console.error("\n❌ Erro:", err.message);
    process.exit(1);
  }
}

main();
