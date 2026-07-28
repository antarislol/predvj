# DVJ — De Volta ao Jardim 🌿
**Landing page de pré-inscrição para o Congresso de Mulheres DVJ**

---

## ⚡ Início rápido

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Firebase

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)  
Painel admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔧 Configuração do Firebase

### 1. Variáveis de ambiente
Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc
NEXT_PUBLIC_ADMIN_LOGIN_EMAIL=kamily@dvj.com.br
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

### 2. Criar a conta da Kamily no Firebase Authentication

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione o projeto **antarisflow**
3. Vá em **Authentication > Users > Adicionar usuário**
4. E-mail: `kamily@dvj.com.br` (ou o e-mail que você configurar em `NEXT_PUBLIC_ADMIN_LOGIN_EMAIL`)
5. Senha inicial: `kamily123`
6. Após criar, copie o **UID** do usuário

### 3. Criar o documento de admin no Firestore

No Firestore, crie o documento:
```
Coleção: admins
Documento ID: [UID copiado acima]
Campos:
  nome: "Kamily"
  username: "kamily"
  role: "admin"
  active: true
  createdAt: [timestamp atual]
```

### 4. Publicar as regras do Firestore

```bash
# Instale o Firebase CLI (se não tiver)
npm install -g firebase-tools

# Faça login
firebase login

# Selecione o projeto
firebase use antarisflow

# Publique as regras
firebase deploy --only firestore:rules

# Publique os indexes
firebase deploy --only firestore:indexes
```

---

## 🔑 Como a Kamily acessa o painel

1. Acesse: `/admin`
2. Login: `kamily`
3. Senha: `kamily123` (senha inicial)
4. **No primeiro acesso, altere a senha:**
   - Firebase Console > Authentication > Users
   - Clique no usuário > **Reset password**
   - Ou no próprio painel, vá em configurações de conta

---

## 🌐 Publicação na Vercel

1. Faça push para o GitHub/GitLab
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente na Vercel (mesmas do `.env.local`)
4. Deploy automático

---

## 📁 Estrutura do projeto

```
app/
  page.tsx                    → Landing page pública
  layout.tsx                  → Layout raiz
  admin/
    layout.tsx                → Layout admin (protegido)
    login/page.tsx            → Tela de login
    page.tsx                  → Dashboard
    pre-inscricoes/page.tsx   → Lista de pré-inscrições
    configuracoes/page.tsx    → Configurações do evento
  politica-de-privacidade/
    page.tsx

components/
  public/                     → Seções da landing page
  layout/                     → Header e Footer
  ui/                         → Elementos decorativos e reutilizáveis

lib/
  firebase/                   → Config, auth e Firestore
  validations/                → Schema Zod
  utils/                      → CEP, CSV, helpers

hooks/
  useAuth.tsx                 → Context de autenticação

public/
  images/logo-dvj.png        → Logo do congresso
```

---

## 🔒 Segurança

- Autenticação real via Firebase Authentication
- Admin verificado por documento na coleção `admins/{uid}`
- Regras do Firestore que impedem acesso não autorizado
- Dados nunca expostos no frontend sem autenticação
- Variáveis de ambiente para credenciais

---

## 📊 Banco de dados — Coleção `pre_inscricoes_dvj`

```json
{
  "nomeCompleto": "string",
  "telefone": "string (formatado)",
  "telefoneNormalizado": "string (só números)",
  "email": "string (lowercase)",
  "endereco": {
    "cep": "string",
    "rua": "string",
    "numero": "string",
    "complemento": "string",
    "bairro": "string",
    "cidade": "string",
    "estado": "string (UF)"
  },
  "igreja": "string",
  "origem": "string",
  "observacoes": "string",
  "consentimentoPrivacidade": "boolean",
  "consentimentoComunicacao": "boolean",
  "status": "pre_inscrita | contatada | aguardando_confirmacao | confirmada | desistiu | arquivada",
  "observacoesAdmin": "string",
  "utm": { "source": "", "medium": "", "campaign": "", "content": "" },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 📧 Contato e suporte

Para atualizar informações de contato (Instagram, WhatsApp, e-mail), acesse o painel:
`/admin/configuracoes`

---

© 2026 DVJ — De Volta ao Jardim
