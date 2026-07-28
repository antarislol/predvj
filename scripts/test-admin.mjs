import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCE-_tyEr9B5iPksMXoi_bcJTz7cumqlWQ",
  authDomain: "antarisflow.firebaseapp.com",
  projectId: "antarisflow"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function testAdmin() {
  try {
    const cred = await signInWithEmailAndPassword(auth, "kamily@dvj.com.br", "kamily123");
    console.log("Login OK! UID:", cred.user.uid);
    
    console.log("Buscando adminData no Firestore...");
    const docRef = doc(db, "admins", cred.user.uid);
    const snap = await getDoc(docRef);
    
    if (snap.exists()) {
      console.log("Documento Admin ENCONTRADO!");
      console.log(snap.data());
    } else {
      console.log("Documento Admin NAO EXISTE para o UID:", cred.user.uid);
    }
  } catch (error) {
    console.error("ERRO NO FIREBASE:", error.code, error.message);
  }
}

testAdmin();
