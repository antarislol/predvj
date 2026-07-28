import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCE-_tyEr9B5iPksMXoi_bcJTz7cumqlWQ",
  authDomain: "antarisflow.firebaseapp.com",
  projectId: "antarisflow"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testLogin() {
  try {
    console.log("Tentando login com kamily@dvj.com.br e kamily123...");
    const cred = await signInWithEmailAndPassword(auth, "kamily@dvj.com.br", "kamily123");
    console.log("Login OK! UID:", cred.user.uid);
  } catch (error) {
    console.error("ERRO NO FIREBASE:", error.code, error.message);
  }
}

testLogin();
