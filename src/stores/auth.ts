import { ref } from 'vue';
import { defineStore } from 'pinia';
import { firebaseAuth } from '@/includes/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useUserStore } from './user';

/**
 * @key: query name
 * @value: firebase id for query setup
 */
type AuthError = {
  code: string;
  message: string;
};

export const useAuthStore = defineStore('auth', () => {
  const signedIn = ref<boolean>(false);
  const errorMessage = ref<AuthError | undefined>(undefined);
  const userStore = useUserStore();
  const { setUser, clearUser, isUsernameUnique, saveUsername } = userStore;

  function checkAuthCookies(): void {
    if (firebaseAuth.currentUser) {
      signedIn.value = true;
    }
  }

  function isSignedIn(): boolean {
    return signedIn.value;
  }

  async function register(
    email: string,
    password: string,
    username: string
  ): Promise<void> {
    const userExist = await isUsernameUnique(username);
    if (!userExist) {
      throw new Error('This username is in use');
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      await saveUsername(username);
      signedIn.value = true;
      setUser(username);
    } catch (error: any) {
      const code = error.code;
      const message = error.message;
      errorMessage.value = {
        code: code,
        message: message,
      };
      console.log(message);
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const displayName = userCredential.user.displayName;
      if (!displayName) {
        throw new Error('Display name is not set');
      }
      setUser(displayName);
      signedIn.value = true;
    } catch (error: any) {
      const code = error.code;
      const message = error.message;
      errorMessage.value = {
        code: code,
        message: message,
      };
      console.log(message);
    }
  }

  async function signOut() {
    clearUser();
    signedIn.value = false;
  }

  return {
    isSignedIn,
    register,
    signIn,
    signOut,
    checkAuthCookies
  };
});
